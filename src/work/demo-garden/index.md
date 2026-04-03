---
layout: layouts/work.njk
order: 1
featured: true
categories:
  - pet-projects
slug: demo-garden
title: Demo Garden
role: Author
url: https://demo-garden.pnetto.com
coverImage: cover.png
type: Containerized demo hosting platform
shortDescription: >
  <p>A self-hosted platform for running and sharing technical experiments. Dozens of containerized demos live on a single AWS EC2-micro instance, waking on demand and sleeping when idle — using around 10MB of RAM at rest.</p>
introSection:
  title: What is it?
  text: >
    <ul>
      <li>On-demand container lifecycle management via a custom Go lazy loader</li>
      <li>Nginx reverse proxy routing traffic to the right container per subdomain</li>
      <li>CI/CD via GitHub Actions — push to deploy in under 1 minute</li>
      <li>Supports any stack that can be containerized: Python, Go, Deno, static sites, databases</li>
      <li>Sub-services (workers, DBs) are also managed and cleaned up automatically</li>
    </ul>
screensSection:
  - media: cover.png
    text: The Demo Garden dashboard
backstorySection:
  text: >
    <p>The idea started from wanting a single, owned place to host technical experiments — without scattering them across Vercel, Fly.io, Heroku, and GCP trial accounts that eventually expire. The goal was a system that was stateless enough to rebuild quickly if something went wrong, and cheap enough to run indefinitely.</p>

    <p>The result runs on an AWS EC2-micro instance (1GB RAM, slow CPU) and hosts dozens of demos. When no traffic arrives, nginx and the lazy loader together use around 10MB of RAM. When a request comes in for a sleeping container, the lazy loader wakes it, proxies the request, then watches for idle time before putting it back to sleep — closely mirroring how platforms like Cloud Run and Heroku manage scale-to-zero internally.</p>

    <p>The lazy loader was initially written in Python (~50MB memory footprint) and later rewritten in Go to get it down to near-zero overhead. It was a good excuse to learn Go properly.</p>

    <p>CI/CD runs on GitHub Actions: images are pre-built on the runner (not on the tiny VM), cached aggressively, then copied to the server and started via SSH. The full deploy cycle — push to live — takes under a minute.</p>

    <p>Each demo gets a page with a description sidebar and an embedded live preview. The project is open source: <a href="https://github.com/pnettto/demo-garden" target="_blank">github.com/pnettto/demo-garden</a>.</p>
detailsSection:
  title: Technical details
  parts:
    - title: Infrastructure
      text: >
        <ul>
          <li>AWS EC2-micro (1GB RAM) — single VM hosting all services</li>
          <li>Nginx reverse proxy — subdomain-based routing to containers</li>
          <li>Custom Go lazy loader — wake/sleep logic with dependency cascade cleanup</li>
          <li>Docker + Docker Compose — all services containerized</li>
          <li>GitHub Actions CI/CD — image pre-build, caching, SSH deploy</li>
        </ul>
    - title: Stack
      text: >
        <ul>
          <li>Go (lazy loader)</li>
          <li>Nginx</li>
          <li>Docker / Docker Compose</li>
          <li>GitHub Actions</li>
          <li>AWS EC2</li>
        </ul>
---
