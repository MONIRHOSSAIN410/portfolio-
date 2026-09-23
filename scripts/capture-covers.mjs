/**
 * প্রতিটা প্রজেক্টের লাইভ স্ক্রিনশট একবার ডাউনলোড করে
 * `public/projects/<slug>.png` হিসেবে সেভ করে।
 *
 * এরপর সাইট আর কোনো থার্ড-পার্টি স্ক্রিনশট সার্ভিসে হিট করবে না —
 * ছবিগুলো আপনার নিজের সার্ভার থেকেই যাবে, অনেক দ্রুত এবং নির্ভরযোগ্য।
 *
 *   npm run covers            # যেগুলো নেই শুধু সেগুলো নামাবে
 *   npm run covers -- --force # সবগুলো আবার নামাবে
 *   npm run covers -- --provider mshots
 *
 * প্রজেক্টের সাইট আপডেট করলে `--force` দিয়ে আবার চালালেই ছবি নতুন হবে।
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const DATA_FILE = path.join(ROOT, "src", "lib", "data.ts");
const OUT_DIR = path.join(ROOT, "public", "projects");

const WIDTH = 1200;
const HEIGHT = 750;
const TIMEOUT_MS = 60_000;
const ATTEMPTS = 3;

const args = process.argv.slice(2);
const force = args.includes("--force");
const providerArg = args[args.indexOf("--provider") + 1];
const provider = args.includes("--provider") ? providerArg : "thumio";

/* ------------------------------ URL builders ------------------------------ */

function screenshotUrl(target) {
  switch (provider) {
    case "mshots":
      return `https://s0.wp.com/mshots/v1/${encodeURIComponent(target)}?w=${WIDTH}&h=${HEIGHT}`;
    case "microlink":
      return `https://api.microlink.io/?url=${encodeURIComponent(
        target
      )}&screenshot=true&meta=false&embed=screenshot.url`;
    case "thumio":
    default:
      return `https://image.thum.io/get/width/${WIDTH}/crop/${HEIGHT}/noanimate/${target}`;
  }
}

/* ------------------------- read projects from data ------------------------ */

function readProjects() {
  const source = fs.readFileSync(DATA_FILE, "utf8");
  const start = source.indexOf("export const projects");
  if (start === -1) throw new Error("`export const projects` not found in src/lib/data.ts");

  // projects অ্যারের পরে যা আছে তা বাদ
  const after = source.indexOf("export const", start + 1);
  const block = source.slice(start, after === -1 ? undefined : after);

  const found = [...block.matchAll(/slug:\s*"([^"]+)"[\s\S]*?url:\s*"([^"]+)"/g)].map((m) => ({
    slug: m[1],
    url: m[2],
  }));

  if (found.length === 0) throw new Error("No projects parsed from src/lib/data.ts");
  return found;
}

/* --------------------------------- fetch --------------------------------- */

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function download(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "monir-portfolio-cover-script" },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const type = res.headers.get("content-type") ?? "";
    if (!type.startsWith("image/")) throw new Error(`Not an image (${type || "unknown type"})`);

    const buffer = Buffer.from(await res.arrayBuffer());
    // mshots প্রথমবার একটা ছোট "generating…" প্লেসহোল্ডার পাঠায়
    if (buffer.byteLength < 6_000) throw new Error("Image looks like a placeholder, retrying");

    return buffer;
  } finally {
    clearTimeout(timer);
  }
}

function existingCover(slug) {
  for (const ext of [".png", ".webp", ".jpg", ".jpeg", ".avif"]) {
    const file = path.join(OUT_DIR, slug + ext);
    if (fs.existsSync(file)) return file;
  }
  return null;
}

/* ---------------------------------- main ---------------------------------- */

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const projects = readProjects();
  console.log(`Capturing ${projects.length} project covers via "${provider}"…\n`);

  let saved = 0;
  let skipped = 0;
  const failures = [];

  for (const { slug, url } of projects) {
    const already = existingCover(slug);
    if (already && !force) {
      console.log(`  ⏭  ${slug} — already exists (use --force to replace)`);
      skipped++;
      continue;
    }

    let lastError;
    for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
      try {
        const buffer = await download(screenshotUrl(url));
        fs.writeFileSync(path.join(OUT_DIR, `${slug}.png`), buffer);
        console.log(`  ✓  ${slug} — ${(buffer.byteLength / 1024).toFixed(0)} KB`);
        saved++;
        lastError = null;
        break;
      } catch (error) {
        lastError = error;
        if (attempt < ATTEMPTS) await sleep(attempt * 4000);
      }
    }

    if (lastError) {
      console.log(`  ✗  ${slug} — ${lastError.message}`);
      failures.push(slug);
    }
  }

  console.log(`\nDone. ${saved} saved, ${skipped} skipped, ${failures.length} failed.`);

  if (failures.length) {
    console.log(
      `\nFailed: ${failures.join(", ")}\n` +
        `Try again, or use a different service:  npm run covers -- --force --provider mshots\n` +
        `যেগুলো শেষ পর্যন্ত আসেনি, সেগুলোর স্ক্রিনশট নিজে নিয়ে\n` +
        `public/projects/<slug>.png নামে রেখে দিলেই হবে।`
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
