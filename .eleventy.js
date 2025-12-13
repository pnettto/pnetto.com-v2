const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const Image = require("@11ty/eleventy-img");

function getFilesRecursive(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => {
    const full = path.join(dir, e.name);
    return e.isDirectory() ? getFilesRecursive(full) : [full];
  });
}

function getFrontMatter(folderPath) {
    // Get all .md files in folder y
    const files = fs.readdirSync(folderPath).filter(f => f.endsWith(".md"));

    if (files.length !== 1) {
      throw new Error(`Expected exactly one .md file in folder y, but found ${files.length}`);
    }

    const filePath = path.join(folderPath, files[0]);
    const content = fs.readFileSync(filePath, "utf-8");
    const frontmatter = matter(content).data;
    return frontmatter
  }

module.exports = async function (eleventyConfig) {
    const { EleventyHtmlBasePlugin } = await import("@11ty/eleventy");

    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("src/.nojekyll");
    eleventyConfig.addPassthroughCopy("src/photos/**/*.{jpg,jpeg,png,webp}");
    
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

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
    
    eleventyConfig.addCollection("logs", (collectionApi) => {
        return collectionApi.getFilteredByGlob("src/logs/**/*.md");
    });

    eleventyConfig.addCollection("work", (collectionApi) => {
        return collectionApi.getFilteredByGlob("src/work/**/*.md");
    });

    eleventyConfig.addCollection("photos", (collectionApi) => {
        return collectionApi.getFilteredByGlob("src/photos/*/index.md");
    });

    // IMAGE WORK

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
            filenameFormat: function (id, _src, width, format) {
                const path = require("path");
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
    
    eleventyConfig.addGlobalData("photoList", async function() {
        const all = getFilesRecursive("src/photos");
        const extensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".avif"];
        const rawImages = all.filter(f => extensions.includes(path.extname(f).toLowerCase()));
        const processedImages = [];
        for (imagePath of rawImages) {
            let metadata = await Image(imagePath, {
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

            const albumParts = imagePath.split('/').slice(0, 3);
            const albumPath = albumParts.join('/');
            metadata.album = {
                path: albumPath,
                title: getFrontMatter(albumPath).title,
                slug: albumParts[albumParts.length - 1]
            };

            processedImages.push(metadata)
        }
        return processedImages;
    });

    return {
        pathPrefix: process.env.PATH_PREFIX || "/",
        dir: {
            input: "src",
            output: "public"
        }
    };
};
