const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const Image = require("@11ty/eleventy-img");

module.exports = async function (eleventyConfig) {
    const { EleventyHtmlBasePlugin } = await import("@11ty/eleventy");

    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/.nojekyll");
    eleventyConfig.addPassthroughCopy("src/photos/**/*.{jpg,jpeg,png,webp}");

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
            urlPath: (process.env.PATH_PREFIX || "/") + "img/",
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

    eleventyConfig.addNunjucksAsyncShortcode("optimizedImageUrl", async function(src, width = "auto") {
        if(src === undefined) {
             return "";
        }
        let metadata = await Image(src, {
            widths: [width],
            formats: ["jpeg"],
            outputDir: "./public/img/",
            urlPath: (process.env.PATH_PREFIX || "/") + "img/",
            sharpOptions: {
                animated: true
            },
            jpegOptions: {
                quality: 90,
            },
            filenameFormat: function (id, src, width, format, options) {
                const path = require("path");
                const extension = path.extname(src);
                return `${id}-${width}w.${format}`;
            }
        });
        
        let data = metadata.jpeg[metadata.jpeg.length - 1];
        return data.url;
    });

    // Date filters
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

    eleventyConfig.addFilter("getAlbumImages", (inputPath) => {
        const path = require("path");
        const fs = require("fs");
        
        let dir = path.dirname(inputPath);
        if (!dir.startsWith(".")) {
            dir = "./" + dir;
        }

        const files = fs.readdirSync(dir);
        let images = [];

        files.forEach(file => {
            if (file.match(/\.(jpg|jpeg|png|webp)$/i)) {
                let urlPath = path.join(dir, file).replace(/^src/, "").replace(/^\\src/, "");
                images.push({
                    name: file,
                    path: urlPath,
                    filePath: path.join(dir, file) // Needed for eleventy-img
                });
            }
        });
        
        return images;
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

    eleventyConfig.addCollection("photos", (collectionApi) => {
        return collectionApi.getFilteredByGlob("src/photos/*/index.md");
    });

    eleventyConfig.addCollection("references", (collectionApi) => {
        return collectionApi.getFilteredByGlob("src/bio/references/*.md");
    });

    return {
        pathPrefix: process.env.PATH_PREFIX || "/",
        dir: {
            input: "src",
            output: "public"
        }
    };
};
