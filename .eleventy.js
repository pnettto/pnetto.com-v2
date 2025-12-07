const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("src/images");

    eleventyConfig.addPlugin(syntaxHighlight);

    // Date filter
    eleventyConfig.addFilter("postDate", (dateObj) => {
        return dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    });

    return {
        dir: {
            input: "src",
            output: "public"
        }
    };
};
