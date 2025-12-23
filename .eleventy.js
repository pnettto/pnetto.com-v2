import "dotenv/config";
import crypto from "crypto";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { generateImgTag } from "./src/_utils/generateImgTag.js";
import Prism from "prismjs";
import loadLanguages from "prismjs/components/index.js";

export default async function (eleventyConfig) {
    const { EleventyHtmlBasePlugin } = await import("@11ty/eleventy");

    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy({ "src/_utils": "assets/js/utils" });
    eleventyConfig.addPassthroughCopy("src/.nojekyll");
    eleventyConfig.addPassthroughCopy("src/**/*.mp4");
    eleventyConfig.addPassthroughCopy({ "compiled/private": "private" });
    eleventyConfig.addPassthroughCopy({ "compiled/img": "img" });
    eleventyConfig.addPassthroughCopy({
        "src/_data/globalAlbumPhotos.json": "albumPhotos.json",
    });

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

    eleventyConfig.addCollection("private", (collectionApi) => {
        return collectionApi.getFilteredByGlob("src/private-open/*.md");
    });

    eleventyConfig.addFilter("json", (value) => JSON.stringify(value));

    eleventyConfig.addFilter("isVideo", (value) => value.includes(".mp4"));

    eleventyConfig.addFilter("postDate", (dateObj) => {
        return dateObj.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    });
    eleventyConfig.addFilter("albumDate", (dateObj) => {
        return dateObj.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
        });
    });

    eleventyConfig.addFilter("isoDate", (dateObj) => {
        return dateObj.toISOString();
    });

    eleventyConfig.addFilter("getAllTags", (collection) => {
        let tagSet = new Set();
        for (let item of collection) {
            (item.data.tags || []).forEach((tag) => tagSet.add(tag));
        }
        return Array.from(tagSet);
    });

    // Get an albums's images given the photos list, via the slug
    eleventyConfig.addFilter(
        "getAlbum",
        function (photos, albumSlug, options = {}) {
            const { limit = null } = options;

            let items = photos.filter((p) => p.album?.slug === albumSlug);
            if (limit) items = items.slice(0, limit);

            return items;
        },
    );

    // Get album slug from a folder path
    eleventyConfig.addFilter("getAlbumSlugFromPath", function (path) {
        const noTrailingSlashPath = path.replace(/\/$/, "");
        const parts = noTrailingSlashPath.split("/");
        return parts[parts.length - 2];
    });

    // Get album slug from a url
    eleventyConfig.addFilter("getAlbumSlugFromUrl", function (path) {
        const parts = path.split("/");
        return parts[parts.length - 2];
    });

    // Get image name from a path
    eleventyConfig.addFilter("getImageNameFromPath", function (path) {
        const parts = path.split("/");
        return parts[parts.length - 1];
    });

    // Get the photo that matches the photo.source, via a path fragment
    eleventyConfig.addFilter(
        "matchPhotosource",
        function (photos, sourceFragment) {
            return photos.filter((p) => {
                return p.source.includes(sourceFragment);
            })[0];
        },
    );

    // A simple hash maker
    eleventyConfig.addFilter("hash", function (str) {
        let hash = 2166136261; // FNV offset basis
        for (let i = 0; i < str.length; i++) {
            hash ^= str.charCodeAt(i);
            hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) +
                (hash << 24);
            hash >>>= 0; // ensure unsigned 32-bit
        }
        return hash;
    });

    eleventyConfig.addFilter("encrypt", (content, password) => {
        if (!password) {
            console.warn(
                "No password provided for encrypted content. Content will be hidden but NOT securely encrypted.",
            );
        }

        const algorithm = "aes-256-gcm";
        const iterations = 150_000;
        const keyLength = 32; // 256 bits
        const digest = "sha256";

        // Generate random salt (public, stored with ciphertext)
        // Same password for all pages
        const salt = Buffer.from(
            "803d0233f92790237d797d67a3933ccada0ad878d596b9b87998cdf5efd18746",
            "hex",
        );

        // Derive key using PBKDF2 (slow, brute-force resistant)
        const key = crypto.pbkdf2Sync(
            password,
            salt,
            iterations,
            keyLength,
            digest,
        );

        // AES-GCM IV (12 bytes recommended)
        const iv = crypto.randomBytes(12);
        const cipher = crypto.createCipheriv(algorithm, key, iv);

        let encrypted = cipher.update(content, "utf8", "hex");
        encrypted += cipher.final("hex");

        const authTag = cipher.getAuthTag();

        // Everything needed for decryption (except password)
        const payload = {
            iv: iv.toString("hex"),
            tag: authTag.toString("hex"),
            data: encrypted,
            salt: salt.toString("hex"),
            iterations,
        };

        return Buffer.from(JSON.stringify(payload)).toString("base64");
    });

    // Allow to use /private-open for compiling
    eleventyConfig.setUseGitIgnore(false);

    // Ignore compiled snapshots folder
    eleventyConfig.ignores.add("src/private-compiled/");

    // Only process 'private-open' when compiling
    if (process.env.ELEVENTY_MODE !== "compile") {
        eleventyConfig.ignores.add("src/private-open/");
    }

    // Return an optimized picture tag with all version of an image
    eleventyConfig.addShortcode("optmizedImageTag", (imageDataRaw, options) => {
        return generateImgTag(imageDataRaw, options);
    });

    const languageMap = {
        "assembly": 45,
        "bash": 46,
        "basic": 47,
        "c": 50,
        "c++": 54,
        "clojure": 86,
        "c#": 51,
        "cobol": 77,
        "common lisp": 55,
        "d": 56,
        "elixir": 57,
        "erlang": 58,
        "executable": 44,
        "f#": 87,
        "fortran": 59,
        "go": 60,
        "groovy": 88,
        "haskell": 61,
        "java": 62,
        "javascript": 63,
        "kotlin": 78,
        "lua": 64,
        "multi-file program": 89,
        "objective-c": 79,
        "ocaml": 65,
        "octave": 66,
        "pascal": 67,
        "perl": 85,
        "php": 68,
        "plain text": 43,
        "prolog": 69,
        "python": 71,
        "r": 80,
        "ruby": 72,
        "rust": 73,
        "scala": 81,
        "sql": 82,
        "swift": 83,
        "typescript": 74,
        "visual basic.net": 8,
    };

    eleventyConfig.addPairedShortcode(
        "codeRunner",
        function (content, langName, isEditable = false) {
            const langId = languageMap[langName.toLowerCase()] || 43;
            const editableAttr = isEditable
                ? 'contenteditable="true" spellcheck="false"'
                : "";

            // Prism work
            loadLanguages([langName.toLowerCase()]);
            const highlightedCode = Prism.highlight(
                content,
                Prism.languages[langName.toLowerCase()] ||
                    Prism.languages.plaintext,
                langName,
            );

            // Encode newlines as HTML entities to prevent the Markdown parser from
            // breaking the HTML structure (e.g., injecting <p> tags or stripping indentation).
            // This ensures the content looks like a single line to the parser but renders correctly.
            const safeHighlightedCode = highlightedCode.replace(/\n/g, "&#10;");

            // Return compressed HTML to prevent markdown parser from misinterpreting indentation
            return `<div class="code-runner" data-lang-id="${langId}">
                <pre class="language-${langName.toLowerCase()}">
                    <code ${editableAttr}>${safeHighlightedCode}</code>
                </pre>
                <button onclick="runCode(this)">Run ${langName}</button>
                <div class="output"></div>
            </div>`;
        },
    );

    return {
        pathPrefix: process.env.PATH_PREFIX || "/",
        dir: {
            input: "src",
            output: "public",
        },
    };
}
