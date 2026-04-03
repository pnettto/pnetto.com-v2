---
layout: layouts/work.njk
order: 4
featured: true
categories:
  - pet-projects
slug: design-system
title: UI Kit / Design System
role: Author
url: https://pnettto.github.io/design-system/
coverImage: cover.png
type: Component library with automated CDN publishing
shortDescription: >
  <p>A personal component library and design system, versioned and continuously published to a Cloudflare R2 CDN — making it easy to reuse UI patterns across projects without copying code.</p>
introSection:
  title: What is it?
  text: >
    <ul>
      <li>Custom UI component library used across personal projects</li>
      <li>Published to a Cloudflare R2 CDN via GitHub Actions on every push</li>
      <li>Versioned with a <code>bump</code> script — "latest" always available alongside pinned versions</li>
      <li>Showcase available at the URL above</li>
    </ul>
screensSection:
  - media: cover.png
    text: Component showcase
backstorySection:
  text: >
    <p>After building several personal projects and noticing I was copying the same components and styles between them, I put together a small design system to centralize that shared UI layer.</p>

    <p>The more interesting part was the publishing workflow. Components are built and published to a Cloudflare R2 bucket (acting as a CDN at <a href="http://pnetto.store" target="_blank">pnetto.store</a>) via a GitHub Actions pipeline. Every push updates "latest"; versioned releases are created with a simple <code>bump.sh</code> script. This means any project consuming the kit can pin to a version or float on latest.</p>

    <p>Source code: <a href="https://github.com/pnettto/design-system" target="_blank">github.com/pnettto/design-system</a>.</p>
detailsSection:
  title: Technical details
  parts:
    - title: Stack
      text: >
        <ul>
          <li>Vanilla Web Components</li>
          <li>GitHub Actions (CI/CD pipeline)</li>
          <li>Cloudflare R2 (CDN hosting)</li>
          <li>Bash bump script (versioning)</li>
        </ul>
---
