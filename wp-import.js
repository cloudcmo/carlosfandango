#!/usr/bin/env node
/**
 * wp-import.js
 * Converts a WordPress XML export to Eleventy markdown posts.
 *
 * Usage:
 *   node wp-import.js wordpress-export.xml
 *
 * Output:
 *   Creates .md files in ./src/posts/
 *
 * Requirements (already in package.json devDependencies):
 *   npm install
 */

const fs   = require("fs");
const path = require("path");
const xml2js    = require("xml2js");
const TurndownService = require("turndown");

const td = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced" });

const xmlFile  = process.argv[2];
const outDir   = path.join(__dirname, "src", "posts");

if (!xmlFile) {
  console.error("Usage: node wp-import.js <wordpress-export.xml>");
  process.exit(1);
}

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const raw = fs.readFileSync(xmlFile, "utf8");

xml2js.parseString(raw, { explicitArray: false }, (err, result) => {
  if (err) { console.error("XML parse error:", err); process.exit(1); }

  const items = result.rss.channel.item;
  const posts = (Array.isArray(items) ? items : [items]).filter(
    (item) => item["wp:post_type"] === "post" && item["wp:status"] === "publish"
  );

  console.log(`Found ${posts.length} published posts.`);
  let saved = 0;

  posts.forEach((post) => {
    const title   = post.title || "Untitled";
    const date    = post["wp:post_date"]?.split(" ")[0] || "1970-01-01";
    const content = post["content:encoded"] || "";
    const excerpt = post["excerpt:encoded"] || "";
    const slug    = post["wp:post_name"] || slugify(title);

    // Convert HTML to markdown
    const body = td.turndown(content);

    // Build frontmatter
    const fm = [
      "---",
      `title: "${title.replace(/"/g, '\\"')}"`,
      `date: ${date}`,
      excerpt ? `description: "${excerpt.replace(/"/g, '\\"').slice(0, 160)}"` : "",
      "tags:",
      "  - posts",
      "layout: post",
      "---",
      ""
    ].filter((l) => l !== undefined && !(l === "" && false)).join("\n");

    const mdContent = fm + "\n" + body;
    const outPath   = path.join(outDir, `${slug}.md`);

    fs.writeFileSync(outPath, mdContent, "utf8");
    saved++;
    console.log(`  ✓ ${slug}.md`);
  });

  console.log(`\nDone. ${saved} posts written to src/posts/`);
});

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
