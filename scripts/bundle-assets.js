import esbuild from "esbuild";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, "..");
const srcDir = path.join(rootDir, "src", "design-system");
const outDir = path.join(rootDir, "public", "design-system");

async function bundle() {
    try {
        console.log("📦 Bundling Design System...");

        // Bundle CSS
        await esbuild.build({
            entryPoints: [path.join(srcDir, "css", "index.css")],
            outfile: path.join(outDir, "css", "bundle.min.css"),
            bundle: true,
            minify: true,
            loader: { ".css": "css" },
            sourcemap: true,
            logLevel: "info",
        });

        // Bundle JS
        await esbuild.build({
            entryPoints: [path.join(srcDir, "js", "index.js")],
            outfile: path.join(outDir, "js", "bundle.min.js"),
            bundle: true,
            minify: true,
            minifyWhitespace: true,
            minifyIdentifiers: true,
            minifySyntax: true,
            sourcemap: true,
            logLevel: "info",
        });

        console.log("✅ Design System bundled successfully!");
    } catch (error) {
        console.error("❌ Bundling failed:", error);
        process.exit(1);
    }
}

bundle();
