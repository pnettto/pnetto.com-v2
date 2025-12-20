const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const Image = require("@11ty/eleventy-img");

/* -------------------------
   Helpers
-------------------------- */

function getFilesRecursive(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? getFilesRecursive(full) : [full];
  });
}

/* -------------------------
   Memoized front matter
-------------------------- */

const albumCache = {};

function getAlbumFrontMatter(albumDir) {
  if (albumCache[albumDir]) {
    return albumCache[albumDir];
  }

  const files = fs.readdirSync(albumDir).filter((f) => f.endsWith(".md"));

  if (files.length !== 1) {
    throw new Error(`Expected 1 md file in ${albumDir}`);
  }

  const content = fs.readFileSync(
    path.join(albumDir, files[0]),
    "utf-8",
  );

  const data = matter(content).data;
  albumCache[albumDir] = data;
  return data;
}

/* -------------------------
   Main
-------------------------- */

(async function buildImages() {
  const imageRoot = "src";
  const output = [];

  const allFiles = getFilesRecursive(imageRoot);
  const images = allFiles.filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));

  for (const imagePath of images) {
    const metadata = await Image(imagePath, {
      widths: [900, 1200, 1600, null],
      formats: ["webp", "jpeg"],
      outputDir: "public/img",
      urlPath: "/img",
      filenameFormat: (id, src, width, format) => {
        const name = path.parse(src).name;
        return `${name}-${id}-${width || "orig"}w.${format}`;
      },
    });

    const imageData = {
      source: imagePath.replace(/^src\//, ""),
      images: metadata,
    };

    if (imagePath.includes("/photos/")) {
      const albumDir = path.dirname(imagePath);
      const albumData = getAlbumFrontMatter(albumDir);
      imageData.album = {
        title: albumData.title,
        slug: path.basename(albumDir),
        path: albumDir.replace(/^src/, ""),
      };
    }

    output.push(imageData);
  }

  fs.mkdirSync("src/_data", { recursive: true });
  fs.writeFileSync(
    "src/_data/photos.json",
    JSON.stringify(output, null, 2),
  );

  console.log(`✔ Processed ${output.length} images`);
})();
