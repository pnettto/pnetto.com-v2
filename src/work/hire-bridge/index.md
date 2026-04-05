---
layout: layouts/work.njk
order: 1
featured: true
categories:
  - pet-projects
slug: hire-bridge
title: Hire Bridge
role: Author
url: Not public (yet)
coverImage: cover-3.png
screensSection:
  - media: cover-3.png
    text: The dashboard
  - media: profile.png
    text: All career details are added to the profile section
  - media: research.png
    text: Create as many research topics as you'd like
  - media: tracker.png
    text: Keep track of each application's status
  - media: listings.png
    text: Overview of job listings found
  - media: costs.png
    text: Overview of LLM costs
type: Job search management system
shortDescription: >
  <p>A personal job search platform with an AI-powered pipeline that searches LinkedIn and Indeed, scores positions against your profile, and manages the full application lifecycle — from a kanban tracker to AI-generated CVs and cover letters. Built during the final stretch of a Data & AI internship as both a practical tool and a portfolio-grade engineering project.</p>
introSection:
  title: What is it?
  text: >
    <p>A personal job search platform: build your profile once, let it find and score matching positions, then manage every application through to offer — with AI-generated CVs, cover letters, and interview prep along the way.</p>
backstorySection:
  text: >
    <p>Near the end of my internship at Capgemini, a job search became my priority. Managing applications in a spreadsheet and manually rewriting a CV for every role felt like exactly the kind of data-driven problem that could be automated.</p>

    <p>Thus Hire Bridge came to life. A Celery worker runs independently to search job boards via Serper, scrape full listings via Apify, deduplicate by SHA-256 fingerprint, score each position against my profile with Gemini, and persist the results — all cancellable mid-run. The kanban board lets me track each position through stages with notes, contacts, and deadlines per entry. And because a tailored application matters, the system generates a role-specific CV, cover letter, and interview Q&amp;A from my master profile using an LLM.</p>

    <p>The project also doubles as a showcase: it touches async data pipelines, task queues, REST APIs, LLM integration, and a typed full-stack architecture — all areas relevant to a Data &amp; AI Engineering job search.</p>
detailsSection:
  title: Technical details
  parts:
    - title: Stack
      text: >
        <ul>
          <li>Python — FastAPI + SQLAlchemy 2.0 (async)</li>
          <li>Next.js 14 App Router (TypeScript)</li>
          <li>PostgreSQL — Alembic migrations, JSONB for flexible fields, cascade deletes, timezone-aware timestamps</li>
          <li>Redis + Celery — background task queue</li>
          <li>Docker / Docker Compose — fully containerized</li>
        </ul>
    - title: Pipeline
      text: >
        <ul>
          <li>Celery worker runs independently: Serper search → Apify scrape → SHA-256 dedup → Gemini scoring → DB save</li>
          <li>Cancellable mid-run; up to 30 positions saved per search with fit % and rationale</li>
          <li>Gemini 2.5 Flash for generation (CV, cover letter, interview Q&amp;A); Flash-Lite for structured JSON (scoring, title expansion)</li>
          <li>Per-call LLM cost logged to Postgres and surfaced in the Costs view</li>
        </ul>
    - title: Auth & data
      text: >
        <ul>
          <li>JWT (HS256, 7-day expiry) + bcrypt; all routes fully isolated per user</li>
          <li>JSONB columns for flexible profile and position fields</li>
          <li>Cascade deletes; timezone-aware timestamps throughout</li>
        </ul>
    - title: Frontend
      text: >
        <ul>
          <li>Typed api() wrapper over all backend endpoints</li>
          <li>Dark-mode Tailwind with semantic design tokens</li>
          <li>localStorage persistence for UI state (tracker filters, sort preferences)</li>
          <li>Live polling while search jobs are in progress</li>
        </ul>
---
