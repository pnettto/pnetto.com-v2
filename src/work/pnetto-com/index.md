---
layout: layouts/work.njk
order: 1
featured: true
categories:
  - pet-projects
slug: pnetto-com
title: pnetto.com
role: Author
url: https://pnetto.com
coverImage: cover.png
type: Personal portfolio website
shortDescription: >
  My personal corner of the internet — a portfolio, blog, and photo gallery built with Eleventy. A place to showcase work, share logs, and host photography albums, all statically generated and hand-crafted.
introSection:
  title: What is it?
  text: >
    <ul>
      <li>Personal portfolio showcasing professional and pet projects</li>
      <li>A logs section for writing about code, career, hobbies, and learnings</li>
      <li>Photo gallery with curated albums from walks, travels, and creative experiments</li>
      <li>Static site built with Eleventy (11ty) and Nunjucks templates</li>
      <li>Custom design system built from scratch</li>
      <li>Bio, CV, contact, and a /now page</li>
    </ul>
screensSection:
  - media: cover.png
    text: The homepage.
backstorySection:
  text: >
    <p>In 2021 I built a Next.js portfolio to help land a job in Copenhagen — and it worked. Fast forward to 2025 and the site was overdue for a refresh, so I rebuilt it from scratch as a simple 11ty static site, adding a photos section and a writing section called "Logs".</p>

    <p>Migrating the old site was quite labor intensive, so I used an LLM to help with the boring migration work, which went really well. Once the skeleton was in place I tried my hand at the design, which I wanted to keep minimal, and the infrastructure: images on Cloudflare R2, hosting on GitHub Pages.</p>

    <p>One thing I'm particularly happy with is the image pipeline. Photos are hosted on Cloudflare R2 — free up to 10GB, no egress fees — and I built a CLI tool to manage the whole thing from the terminal. Syncing albums, generating 3 responsive size variants per image, updating the JSON manifests that the build reads from — all of it is a single command away. What used to be a manual, error-prone process of uploading and referencing images is now just <code>npm run imgSync</code>. It's a small thing but it makes the whole photography section feel effortless to maintain, which means I actually use it.</p>
detailsSection:
  title: Technical details
  parts:
    - title: Stack
      text: >
        <ul>
          <li>Eleventy (11ty) as the static site generator</li>
          <li>Nunjucks for templating</li>
          <li>Markdown for content authoring</li>
          <li>Custom CSS design system</li>
          <li>Vanilla JavaScript for interactivity</li>
          <li>Cloudflare R2 for image hosting</li>
        </ul>
    - title: Features
      text: >
        <ul>
          <li>Work portfolio with categorized projects</li>
          <li>Photo gallery with album management</li>
          <li>Logs / writing section with categories and tags</li>
          <li>Bio, CV, contact, and /now page</li>
          <li>Private password-protected section</li>
          <li>Sitemap generation</li>
          <li>Image build pipeline with optimization</li>
        </ul>
---
