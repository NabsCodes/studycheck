import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const app = new URL("../app/", import.meta.url);
const source = await readFile(new URL("icon.svg", app));

await sharp(source)
  .resize(192, 192)
  .png()
  .toFile(new URL("icon.png", app).pathname);
await sharp(source)
  .resize(180, 180)
  .flatten({ background: "#315c45" })
  .png()
  .toFile(new URL("apple-icon.png", app).pathname);

// ICO files contain a directory followed by one image for each advertised size.
// PNG entries retain the SVG's antialiased edges at small browser-tab sizes.
const sizes = [16, 32, 48];
const images = await Promise.all(
  sizes.map((size) => sharp(source).resize(size, size).png().toBuffer()),
);
const directory = Buffer.alloc(6 + sizes.length * 16);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(sizes.length, 4);
let offset = directory.length;

for (const [index, size] of sizes.entries()) {
  const entry = 6 + index * 16;
  directory.writeUInt8(size, entry);
  directory.writeUInt8(size, entry + 1);
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(images[index].length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += images[index].length;
}

await writeFile(
  new URL("favicon.ico", app),
  Buffer.concat([directory, ...images]),
);
