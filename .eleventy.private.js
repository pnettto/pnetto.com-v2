import "dotenv/config";
import crypto from "crypto";

export default function (eleventyConfig) {
    eleventyConfig.setServerOptions({
        domdiff: false,
        showAllHosts: true,
    });

    // Tell Eleventy to follow symlinks
    eleventyConfig.setUseGitIgnore(false);
    eleventyConfig.setWatchThrottleWaitTime(100);

    eleventyConfig.addCollection("private", (collectionApi) => {
        return collectionApi.getFilteredByGlob("src/private-open/*.md");
    });

    eleventyConfig.addFilter("postDate", (dateObj) => {
        return dateObj.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
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

    return {
        dir: {
            input: "src/private-open",
            includes: "../_includes",
            data: "../_data",
        },
        templateFormats: ["md", "njk", "html"],
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
    };
}
