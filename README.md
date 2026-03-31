# carlosfandango.net

Personal homepage — built with [Eleventy](https://www.11ty.dev/), hosted on Cloudflare Pages.

---

## Stack

- **Generator**: Eleventy (11ty) v2
- **Templating**: Nunjucks
- **Posts**: Markdown files in `src/posts/`
- **Hosting**: Cloudflare Pages
- **Deploy**: GitHub push → auto-deploy

---

## First-time setup

### 1. Install dependencies

```bash
cd '/Users/carl/Dropbox/AI experiments/carlosfandango'
npm install
```

### 2. Create GitHub repo

1. Go to github.com → New repository
2. Name it `carlosfandango` (or similar), set to Public
3. Don't initialise with a README

### 3. Initialise git locally

```bash
cd '/Users/carl/Dropbox/AI experiments/carlosfandango'
git init
git add -A
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/carlosfandango.git
git push -u origin main
```

### 4. Connect Cloudflare Pages

1. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git
2. Select your `carlosfandango` repo
3. Build settings:
   - **Framework preset**: None
   - **Build command**: `npm run build`
   - **Build output directory**: `_site`
   - **Node version**: set environment variable `NODE_VERSION = 20`
4. Deploy

### 5. Add your domain

In Cloudflare Pages → Custom domains → Add `carlosfandango.net`

---

## Daily workflow

### Local dev

```bash
npm start
# Serves at http://localhost:8080 with live reload
```

### Writing a new post

Create a file in `src/posts/` named `your-post-slug.md`:

```markdown
---
title: Your post title
date: 2026-04-01
description: Optional short description for meta tags.
tags:
  - posts
layout: post
---

Your post content in markdown here.
```

Then deploy:

```bash
bash deploy.sh "New post: your post title"
```

---

## Importing WordPress posts

1. In WordPress admin: **Tools → Export → All content** → download XML
2. Put the XML file in this project folder
3. Run:

```bash
node wp-import.js your-export.xml
```

This creates markdown files in `src/posts/` for every published post.
Review them, then deploy as normal.

---

## Project structure

```
carlosfandango/
├── src/
│   ├── _includes/
│   │   └── layouts/
│   │       ├── base.njk       ← site shell (header, footer)
│   │       └── post.njk       ← single post layout
│   ├── assets/
│   │   └── css/
│   │       └── main.css
│   ├── posts/
│   │   └── *.md               ← your blog posts live here
│   ├── index.njk              ← homepage
│   └── blog.njk               ← blog listing page
├── .eleventy.js               ← Eleventy config
├── .gitignore
├── deploy.sh                  ← push to GitHub
├── package.json
├── wrangler.toml              ← Cloudflare Pages build config
└── wp-import.js               ← WordPress importer
```
