import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const parts = Array.from({ length: 6 }, (_, index) =>
  readFileSync(
    resolve(`assets/from-europe-to-asia/part-${index + 1}.txt`),
    "utf8",
  ).trim(),
);

console.log(`Europe-to-Asia base64 parts: ${parts.map((part) => part.length).join(", ")}`);

const image = Buffer.from(parts.join(""), "base64");
const expectedBytes = 25018;
const expectedSha256 =
  "586d2bc1d4486e2cc3b8589d6a7fd4c60a2781c5509d08fd6b720e7c5aab6a58";
const actualSha256 = createHash("sha256").update(image).digest("hex");

if (image.length !== expectedBytes || actualSha256 !== expectedSha256) {
  throw new Error(
    `Europe-to-Asia PNG validation failed: ${image.length} bytes, ${actualSha256}`,
  );
}

const target = resolve("public/images/from-europe-to-asia.png");
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, image);
console.log(`Prepared ${target}`);
