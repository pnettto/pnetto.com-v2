---
layout: layouts/work.njk
order: 2
featured: true
categories:
  - pet-projects
slug: evalgen
title: Evalgen
role: Author
url: https://evalgen-26115925037.us-central1.run.app/
coverImage: cover.png
type: Evaluation dataset generator for AI agents
shortDescription: >
  <p>A tool that scrapes web pages and PDFs, then uses an LLM to generate question–answer pairs a customer support agent might ask — structured for use in agent evaluation pipelines.</p>
introSection:
  title: What is it?
  text: >
    <ul>
      <li>Scrapes web pages and PDFs as input sources</li>
      <li>Uses an LLM to generate questions, expected answers, and telecom category labels</li>
      <li>Stores results in Firestore and serves them via a JSON API endpoint</li>
      <li>Includes a clean web UI for browsing generated datasets</li>
      <li>Deployed on GCP Cloud Run</li>
    </ul>
screensSection:
  - media: cover.png
    text: The Evalgen interface
backstorySection:
  text: >
    <p>Built during my work time at Capgemini/Telia, where the team needed evaluation data for an AI support assistant. The challenge: the assistant was being trained on a knowledge base of product documentation, but there was no structured dataset of questions a real customer might ask — which made evaluation difficult.</p>

    <p>Evalgen solves this by turning any web page or PDF into a set of plausible Q&A pairs, tagged with a broad support category. The outputs can feed directly into an evaluation framework like Langfuse to measure how well an agent handles different query types.</p>

    <p>The architecture is straightforward: a Python FastAPI app running on GCP Cloud Run, with Firestore as the storage backend. The scraping layer handles both HTML and PDF inputs. Results are available through a web UI and a JSON endpoint so they can be consumed by other tools in the pipeline.</p>

    <p>The main technical challenge was IAM — making sure each GCP service (Cloud Run, Firestore, the scraping worker) had the right service account with the minimum necessary permissions. Getting that right without over-provisioning took most of the debugging time.</p>
detailsSection:
  title: Technical details
  parts:
    - title: Stack
      text: >
        <ul>
          <li>Python (FastAPI)</li>
          <li>GCP Cloud Run</li>
          <li>Firestore (document storage)</li>
          <li>OpenAI API / Vertex AI (Q&A generation)</li>
          <li>Web scraping (HTML + PDF)</li>
          <li>IAM / Service Accounts</li>
        </ul>
---
