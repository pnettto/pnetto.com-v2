const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const Image = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/.nojekyll");

    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

    eleventyConfig.addNunjucksAsyncShortcode("image", async function(src, alt, sizes = "100vw", className = "") {
        if(alt === undefined) {
            throw new Error(`Missing \`alt\` on image from: ${src}`);
        }

        let metadata = await Image(src, {
            widths: [300, 600, 900, 1200, "auto"],
            formats: ["webp", "jpeg"],
            outputDir: "./public/img/",
            urlPath: "/img/",
            sharpOptions: {
                animated: true
            },
            jpegOptions: {
                quality: 90,
            },
            webpOptions: {
                quality: 90,
            },
            filenameFormat: function (id, src, width, format, options) {
                const path = require("path");
                const extension = path.extname(src);
                // Use id (hash) to prevent collisions for files with same name
                return `${id}-${width}w.${format}`;
            }
        });

        let imageAttributes = {
            alt,
            sizes,
            class: className,
            loading: "lazy",
            decoding: "async",
        };

        return Image.generateHTML(metadata, imageAttributes);
    });

    // Date filter
    eleventyConfig.addFilter("postDate", (dateObj) => {
        return dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    });

    eleventyConfig.addFilter("isoDate", (dateObj) => {
        return dateObj.toISOString();
    });

    // Data extensions
    eleventyConfig.addFilter("getAllTags", collection => {
        let tagSet = new Set();
        for (let item of collection) {
            (item.data.tags || []).forEach(tag => tagSet.add(tag));
        }
        return Array.from(tagSet);
    });
    
    eleventyConfig.addCollection("logs", (collectionApi) => {
        return collectionApi.getFilteredByGlob("src/logs/**/*.md");
    });

    eleventyConfig.addCollection("work", (collectionApi) => {
        return collectionApi.getFilteredByGlob("src/work/**/*.md");
    });

    eleventyConfig.addFilter("filterTagList", tags => {
        return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
    });

    return {
        pathPrefix: process.env.PATH_PREFIX || "/",
        dir: {
            input: "src",
            output: "public"
        }
    };
};
