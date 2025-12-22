import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const referencesPath = path.join(__dirname, "references");

export default () => {
  return fs.readdirSync(referencesPath)
    .map((file) =>
      matter(fs.readFileSync(`${referencesPath}/${file}`, "utf8"))
    );
};
