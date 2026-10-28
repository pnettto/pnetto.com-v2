---
layout: layouts/work.njk
order: 1
featured: true
categories:
  - pet-projects
slug: opendoors
title: OpenDoors
role: Author
url: https://opendoors.work
coverImage: dashboard.png
screensSection:
  - media: dashboard.png
    text: The dashboard, with the best-fitting roles up front
  - media: profile.png
    text: Build your career profile once, then improve it with AI
  - media: research.png
    text: Each research run shows every step, from search to saved positions
  - media: positions.png
    text: Saved positions with fit scores, filters and AI summaries
  - media: position.png
    text: A position's details, with a fit score that explains itself
  - media: tracker.png
    text: The tracker board, from found to offer
  - media: chat.png
    text: The profile chat can generate a CV and export it as PDF
  - media: learn.png
    text: The Learn page, with a chat that has read the manual
type: AI job search assistant
shortDescription: >
  <p>An AI job search assistant: build your profile once, let it find and score matching roles on LinkedIn and Indeed, track every application on a board, and generate tailored CVs, cover letters and interview prep along the way.</p>
introSection:
  title: What is it?
  text: >
    <ul>
      <li>Import a CV and get a structured career profile you can edit and polish with AI</li>
      <li>Research runs search LinkedIn and Indeed, skip duplicates and score each role against your profile, with the reasons</li>
      <li>A tracker board and per-position pages for notes, contacts, follow-ups and documents</li>
      <li>Tailored CVs, cover letters and interview prep, exported as PDF or Markdown</li>
      <li>Chats that know your profile and the job, plus one that has read the user manual</li>
    </ul>
backstorySection:
  text: >
    <p>In March '26 a job search became my priority. Keeping applications in a spreadsheet and rewriting my CV for every role felt like exactly the kind of problem worth automating, so I started building. The first commit landed on 17 March, and within a week it could already build a profile, search job boards, score the results and generate a tailored CV.</p>

    <p>It started as Hire Bridge, a tool just for me. Over the following weeks it grew into a real product and got a new name, OpenDoors: Google sign-in, credits with Stripe checkout, onboarding, a Learn page, and a calmer redesign. 40 beta testers used it in their own job searches, and their feedback shaped most of what got built.</p>

    <p>Under the hood it was also a place to show what careful AI development looks like in a real product: background workers for every slow AI task, per-call cost tracking, observability and alerts, and an end-to-end test suite that mocks every model and external API.</p>

    <p>In October '26 OpenDoors was sunset. The site stays online as a test system: anyone can sign up and try it, and accounts are wiped every night.</p>
detailsSection:
  title: Technical details
  parts:
    - title: Stack
      text: >
        <ul>
          <li>Python — FastAPI + SQLAlchemy 2.0 (async)</li>
          <li>Next.js 14 App Router (TypeScript), Tailwind</li>
          <li>PostgreSQL with pgvector, Alembic migrations</li>
          <li>Redis + Celery, Caddy as reverse proxy</li>
          <li>Docker Compose on a GCP VM</li>
        </ul>
    - title: Workers
      text: >
        <ul>
          <li>Three Celery workers with their own images and queues: research, LLM and PDF</li>
          <li>The API only creates a job and hands it off; the frontend polls until it's done</li>
          <li>Research pipeline: title expansion → Serper search → Apify scrape → dedup → fit scoring, level detection and summaries → save</li>
          <li>PDF rendering with WeasyPrint</li>
        </ul>
    - title: AI
      text: >
        <ul>
          <li>Pydantic AI on Gemini 3.1, switchable to Anthropic Claude</li>
          <li>Chat agents with tools that can read and update the profile and start document generation</li>
          <li>Remembers career preferences across chats</li>
          <li>RAG over the user manual with pgvector for the Learn chat</li>
          <li>Every LLM call logged with its cost, shown in the app as credits</li>
        </ul>
    - title: Product & operations
      text: >
        <ul>
          <li>Google OAuth and JWT auth, Stripe credits and promo codes</li>
          <li>Prometheus, Loki and Grafana with alerting, plus Telegram notifications for failures</li>
          <li>User event tracking with its own Grafana dashboard</li>
          <li>Integration, worker and Playwright E2E tests, with every LLM and external API mocked</li>
        </ul>
---
