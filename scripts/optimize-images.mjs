#!/usr/bin/env node
/**
 * One-off image pipeline: turns full-resolution sources into web-sized files
 * and self-hosts every image the site uses (no more hotlinking).
 *
 *   node scripts/optimize-images.mjs <dir-with-magnific-downloads>
 *
 * Outputs
 *  - assets/images/*.jpg          Magnific photos for heroes/sections (statically
 *                                 imported, so next/image adds AVIF/WebP + blur)
 *  - public/images/articles/*.webp  one cover per article, 1200px wide
 *  - public/images/clients/*.webp   employer logos, max 320px, alpha kept
 * and rewrites the image/logo fields in data/*.json to the local paths.
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const srcDir = process.argv[2];
if (!srcDir) {
  console.error("Usage: node scripts/optimize-images.mjs <magnific-download-dir>");
  process.exit(1);
}

/** Magnific stock photos → name, max width, and (optionally) the article they replace. */
const MAGNIFIC = [
  { file: "montreal-dusk-with-urban-skyscrapers-viewed-from-mont-royal.jpg", out: "hero-montreal", width: 2400 },
  { file: "happy-female-factory-worker-hardhat-overall-standing-machine-holding-tablet-looking-front-smiling.jpg", out: "header-recruitment", width: 1400 },
  { file: "young-black-businessman-woman-going-through-some-paperwork-together.jpg", out: "header-immigration", width: 1400 },
  { file: "hr-greets-caucasian-job-seeker-warmly.jpg", out: "services-recruitment", width: 1400 },
  { file: "top-view-hands-holding-travel-documents.jpg", out: "services-immigration", width: 1400 },
  { file: "multiethnic-leaders-business-meeting-brainstorming-growth-strategy.jpg", out: "about-approach", width: 1400 },
  { file: "young-man-civil-engineer-safety-hat.jpg", article: "guide-complet-sur-limmigration-dans-le-domaine-de-la-construction-au-quebec" },
  { file: "winding-blue-alleyway-chefchaouen-morocco.jpg", article: "recruter-des-travailleurs-au-maroc" },
  { file: "freelancer-home-office-opening-laptop-starting-working-tasks.jpg", article: "immigrer-au-quebec-en-tant-que-travailleur-autonome" },
  { file: "unrecognizable-businessmen-sitting-table-meeting-analyzing-graphs.jpg", article: "immigrer-au-quebec-en-tant-quinvestisseur" },
];

const ARTICLE_WIDTH = 1200;
const LOGO_BOX = 320;
const ALLOWED_HOST = "cdn.prod.website-files.com";

const kb = (n) => `${Math.round(n / 1024)}KB`;
const readJson = async (f) => JSON.parse(await fs.readFile(path.join(root, f), "utf8"));
const writeJson = (f, v) => fs.writeFile(path.join(root, f), JSON.stringify(v, null, 2) + "\n");

async function fetchImage(url) {
  const u = new URL(url);
  if (u.protocol !== "https:" || u.hostname !== ALLOWED_HOST) throw new Error(`unexpected host: ${u.hostname}`);
  const res = await fetch(u, { signal: AbortSignal.timeout(60_000) });
  if (!res.ok) throw new Error(`${res.status} for ${u.pathname}`);
  return Buffer.from(await res.arrayBuffer());
}

/** Run async jobs with a small concurrency limit. */
async function pool(items, limit, fn) {
  const queue = [...items];
  const workers = Array.from({ length: limit }, async () => {
    while (queue.length) await fn(queue.shift());
  });
  await Promise.all(workers);
}

const articleCover = (input, dest) =>
  sharp(input)
    .rotate()
    .resize({ width: ARTICLE_WIDTH, height: Math.round(ARTICLE_WIDTH / 1.5), fit: "cover", position: "attention" })
    .webp({ quality: 72, effort: 5 })
    .toFile(dest);

async function main() {
  const assetsDir = path.join(root, "assets/images");
  const articleDir = path.join(root, "public/images/articles");
  const clientDir = path.join(root, "public/images/clients");
  await Promise.all([assetsDir, articleDir, clientDir].map((d) => fs.mkdir(d, { recursive: true })));

  // 1) Magnific photos
  const overrides = new Map();
  for (const m of MAGNIFIC) {
    const input = path.join(srcDir, m.file);
    if (m.article) {
      const dest = path.join(articleDir, `${m.article}.webp`);
      const info = await articleCover(input, dest);
      overrides.set(m.article, true);
      console.log(`article  ${m.article.slice(0, 40).padEnd(40)} ${kb(info.size)}`);
    } else {
      const dest = path.join(assetsDir, `${m.out}.jpg`);
      const info = await sharp(input)
        .rotate()
        .resize({ width: m.width, withoutEnlargement: true })
        .jpeg({ quality: 80, mozjpeg: true, progressive: true })
        .toFile(dest);
      console.log(`photo    ${m.out.padEnd(40)} ${info.width}x${info.height} ${kb(info.size)}`);
    }
  }

  // 2) Remaining article covers from the old CDN
  const articles = await readJson("data/articles.json");
  let fetched = 0;
  await pool(articles, 4, async (a) => {
    const local = `/images/articles/${a.slug}.webp`;
    if (!overrides.has(a.slug)) {
      if (!a.image || a.image.startsWith("/")) return;
      const info = await articleCover(await fetchImage(a.image), path.join(root, "public", local));
      fetched++;
      if (fetched % 10 === 0) console.log(`  …${fetched} covers fetched (last ${kb(info.size)})`);
    }
    a.image = local;
  });
  await writeJson("data/articles.json", articles);
  console.log(`articles ${articles.length} covers → public/images/articles (${fetched} fetched)`);

  // 3) Client logos (also used by job cards)
  const clients = await readJson("data/clients.json");
  const logoMap = new Map();
  await pool(clients, 4, async (c) => {
    if (!c.logo || c.logo.startsWith("/")) return;
    const local = `/images/clients/${c.slug}.webp`;
    await sharp(await fetchImage(c.logo))
      .resize({ width: LOGO_BOX, height: LOGO_BOX, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 85, alphaQuality: 90 })
      .toFile(path.join(root, "public", local));
    logoMap.set(c.logo, local);
    c.logo = local;
  });
  await writeJson("data/clients.json", clients);

  const jobs = await readJson("data/jobs.json");
  for (const j of jobs) if (j.logo && logoMap.has(j.logo)) j.logo = logoMap.get(j.logo);
  await writeJson("data/jobs.json", jobs);
  console.log(`clients  ${clients.length} logos → public/images/clients`);

  const leftovers = [...articles.map((a) => a.image), ...clients.map((c) => c.logo), ...jobs.map((j) => j.logo)].filter(
    (u) => u && !u.startsWith("/")
  );
  console.log(leftovers.length ? `WARNING: ${leftovers.length} remote URLs remain` : "All images are now self-hosted.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
