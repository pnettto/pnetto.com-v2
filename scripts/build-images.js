import "dotenv/config";
import fs from "fs/promises";
import { existsSync, mkdirSync } from "fs";
import path from "path";
import Image from "@11ty/eleventy-img";
import pLimit from "p-limit";

const limit = pLimit(10); // process 10 images at a time

/* -------------------------
   Helpers
-------------------------- */

async function getFilesRecursive(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => {
    const res = path.join(dir, entry.name);
    return entry.isDirectory() ? getFilesRecursive(res) : res;
  }));
  return files.flat();
}

function stripOutputPath(metadata) {
  const cleaned = {};
  for (const format of Object.keys(metadata)) {
    cleaned[format] = metadata[format].map((
      { outputPath, sourceType, size, ...rest },
    ) => rest);
  }
  return cleaned;
}

function djb2Hash(text) {
  let hash = 5381;
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 33) ^ text.charCodeAt(i);
  }
  return (hash >>> 0).toString(16);
}

/* -------------------------
   Main
-------------------------- */

(async function buildImages() {
  const imageRoot = "src";
  const outputDir = path.join(import.meta.dirname, "../compiled/img");

  const allFiles = await getFilesRecursive(imageRoot);
  const allowedDirs = ["work", "logs", "assets", "private-open"];
  const images = allFiles.filter((f) =>
    allowedDirs.some((dir) => f.startsWith(`src/${dir}`)) &&
    /\.(jpg|jpeg|png|webp|gif)$/i.test(f)
  );

  const tasks = images.map((imagePath) =>
    limit(async () => {
      const isGif = /\.gif$/i.test(imagePath);

      const rawMetadata = await Image(imagePath, {
        widths: isGif ? [null] : [900, 1200, 1600, 1920],
        formats: isGif ? ["gif"] : ["jpeg"],
        outputDir,
        urlPath: `${process.env.R2_URL}/pnetto-com/`,
        sharpOptions: isGif ? { animated: true } : undefined,
        sharpJpegOptions: isGif ? undefined : {
          quality: 80,
          progressive: true,
          mozjpeg: true,
          chromaSubsampling: "4:4:4",
          dither: true,
        },
        filenameFormat: (_, src, width, format) => {
          const name = path.parse(src).name;
          const hash = djb2Hash(src);
          return width
            ? `${name}-${hash}-${width}w.${format}`
            : `${name}-${hash}.${format}`;
        },
      });

      const imageData = {
        source: imagePath.replace(/^src\//, ""),
        images: stripOutputPath(rawMetadata),
      };

      return imageData;
    })
  );

  const output = await Promise.all(tasks);

  if (!existsSync("src/_data")) mkdirSync("src/_data", { recursive: true });

  await fs.writeFile("src/_data/globalAllPhotos.json", JSON.stringify(output));

  console.log(`✔ Processed ${output.length} images`);
})();
