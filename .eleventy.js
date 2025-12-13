const fs = require("fs");
const path = require("path");
const Image = require("@11ty/eleventy-img");
const matter = require("gray-matter");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = async function (eleventyConfig) {
    const { EleventyHtmlBasePlugin } = await import("@11ty/eleventy");

    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("src/.nojekyll");

    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

    eleventyConfig.addCollection("logs", (collectionApi) => {
        return collectionApi.getFilteredByGlob("src/logs/**/*.md");
    });

    eleventyConfig.addCollection("work", (collectionApi) => {
        return collectionApi.getFilteredByGlob("src/work/**/*.md");
    });

    eleventyConfig.addCollection("photos", (collectionApi) => {
        return collectionApi.getFilteredByGlob("src/photos/*/index.md");
    });

    eleventyConfig.addFilter("json", value => JSON.stringify(value));

    eleventyConfig.addFilter("postDate", (dateObj) => {
        return dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    });
    eleventyConfig.addFilter("albumDate", (dateObj) => {
        return dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
        });
    });

    eleventyConfig.addFilter("isoDate", (dateObj) => {
        return dateObj.toISOString();
    });

    eleventyConfig.addFilter("getAllTags", collection => {
        let tagSet = new Set();
        for (let item of collection) {
            (item.data.tags || []).forEach(tag => tagSet.add(tag));
        }
        return Array.from(tagSet);
    });

    // Select only album-related photos
    eleventyConfig.addFilter("selectedPhotos", function (photos) {
        return photos.filter(p => !!p.album)
    });


    // Get an albums's images given the photos list, via the slug
    eleventyConfig.addFilter("getAlbum", function (photos, albumSlug, options = {}) {
        const { limit = null } = options;

        let items = photos.filter(p => p.album?.slug === albumSlug);
        if (limit) items = items.slice(0, limit);

        return items;
    });

    // Get album slug from a folder path
    eleventyConfig.addFilter("getAlbumSlugFromPath", function (path) {
        const noTrailingSlashPath = path.replace(/\/$/, "");
        const parts = noTrailingSlashPath.split('/');
        return parts[parts.length - 2];
    });

    // Get album slug from a url
    eleventyConfig.addFilter("getAlbumSlugFromUrl", function (path) {
        const parts = path.split('/');
        return parts[parts.length - 2];
    });
    
    // Get image name from a path
    eleventyConfig.addFilter("getImageNameFromPath", function (path) {
        const parts = path.split('/');
        return parts[parts.length - 1];
    });

    // Get the photo that matches the photo.source, via a path fragment
    eleventyConfig.addFilter("matchPhotosource", function (photos, sourceFragment) {
        return photos.filter(p => p.source.includes(sourceFragment))[0]
    });

    // Return an optimized picture tag with all version of an image
    eleventyConfig.addShortcode(
        "optmizedImageTag",
        function (image, options = {}) {
            const {
                alt = "",
                loading = "lazy",
                decoding = "async",
                className = "",
                sizes = ""
            } = options;

            if (!image || !image.images) {
                return "";
            }

            const sources = Object.entries(image.images)
                .map(([format, imgs]) => {
                    const srcset = imgs
                        .map(img => `${img.url} ${img.width}w`)
                        .join(", ");

                    return `<source type="image/${format}" srcset="${srcset}">`;
                })
                .join("\n");

            const fallback = image.images.jpeg.at(-1);

            return `
                <picture>
                ${sources}
                <img
                    src="${fallback.url}"
                    alt="${alt}"
                    loading="${loading}"
                    decoding="${decoding}"
                    ${sizes ? ` sizes="${sizes}"` : ""}
                    ${className ? ` class="${className}"` : ""}
                >
                </picture>
                `.trim();
        }
    );

    return {
        pathPrefix: process.env.PATH_PREFIX || "/",
        dir: {
            input: "src",
            output: "public"
        }
    };
};
