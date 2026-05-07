---
layout: layouts/post.njk
title: "Learnings from my work at Capgemini/Telia"
date: 2026-03-29
tags:
    - career
    - 2026-03
---

My work at Capgemini/Telia gave me something I didn't expect: not just technical growth, but a much sharper understanding of how serious software gets built and shipped in enterprise environments — and where AI fits into that picture. These five experiences stood out.

**AI-Enhanced Coding**

I've been using AI coding agents since 2023, but this job was where I learned to *direct* them rather than follow them. The difference turned out to be clarity — knowing the architecture, the constraints, and the tradeoffs before writing a single prompt. Working with Claude Sonnet/Opus, Codex, and Gemini, I found that the quality of AI output tracks directly with how precisely you can define the problem. That discipline has permanently changed how I approach new work in a responsible way.

**Docker & Kubernetes**

Docker became my favorite tool of the period — not just for local development, but as a deployment platform. I built [Demo Garden](https://demo-garden.pnetto.com/) from scratch as an exploration of how Google Cloud Run manages containerized applications internally: on-demand serving, scale-to-zero, high availability.

At Telia, I also worked alongside data engineers running complex on-prem Kubernetes clusters for production data pipelines. That exposure gave me a concrete picture of how Kubernetes applies at scale — both in cloud-native and hybrid infrastructure contexts.

**Google Cloud Platform & Event-Oriented Architecture**

I completed the GCP [Professional Cloud Developer study path](https://partner.skills.google/paths/82), focusing on service inter-connectivity, event-driven design, and cloud governance. The governance piece was a important level-up: I came away confident building solutions that handle sensitive data with proper IAM controls and access boundaries — not just functional applications, but responsible ones.

**RAG-Powered Chat Assistant with ADK**

This was the most complex project I took on. I helped develop chat assistants for Telia capable of handling a variety of cases, from product information retrieval to real-time support using internal knowledge bases like Confluence and Jira, to support ticket creation.

The technical surface was wide: ADK multi-agent orchestration, RAG pipeline design, similarity search, prompt engineering, and session context management. But what surprised me most was everything *around* the code — data privacy requirements, hallucination mitigation, token cost modeling, access control, and navigating alignment across engineering, architecture, and legal stakeholders. Enterprise AI is an entirely different discipline than small scale AI.

I also implemented Langfuse for observability, built an evaluation dataset generator (Evalgen), and developed an alternative GCP Logging integration — giving the team meaningful visibility into agentic system behavior.

See some of this work in action here:

<div class="video-wrapper">
    <video
        src="/assets/media/adk_langfuse.mp4"
        class="video"
        autoplay
        muted
        loop
        playsinline
    >
    </video>
    <p class="caption">Demonstrating ADK-Langfuse integration and custom observations</p>
</div>

<div class="video-wrapper">
    <video
        src="/assets/media/observable_chat_session.mp4"
        class="video"
        autoplay
        muted
        loop
        playsinline
    >
    </video>
    <p class="caption">A custom tool to visualize details about a specific session</p>
</div>

<div class="video-wrapper">
    <video
        src="/assets/media/gcp_logging.mp4"
        class="video"
        autoplay
        muted
        loop
        playsinline
    >
    </video>
    <p class="caption">Demonstrating how GCP Logging can be integrated to enhance agent observability</p>
</div>

<div class="video-wrapper">
    <video
        src="/assets/media/evalgen.mp4"
        class="video"
        autoplay
        muted
        loop
        playsinline
    >
    </video>
    <p class="caption">A custom tool to create evaluation datasets, which can be used to demonstrate agent accuracy</p>
</div>



**MCP-Enabled Application Development**

Toward the end of the time there I got hands-on with MCP (Model Context Protocol), building applications that expose tools and context to LLMs in a structured, composable way. This is where the agentic AI space is heading — moving from single-model calls toward systems where models can reliably act, retrieve, and coordinate. Having practical experience here feels like being early to something that's about to matter a lot.

<div class="video-wrapper">
    <video
        src="/assets/media/multiple_mcps.mp4"
        class="video"
        autoplay
        muted
        loop
        playsinline
    >
    </video>
    <p class="caption">A quick demo</p>
</div>

**Going forward**

I'll be wrapping up this work experience with a clearer picture of what I want to build next: data and AI systems that are production-grade, observable, and built with the full stack in mind.