---
layout: layouts/work.njk
order: 5
featured: true
categories:
  - pet-projects
slug: gcp-billing-auto-disable
title: GCP Billing Auto-Disable
role: Author
coverImage: cover.png
screensSection:
  - media: cover.png
type: Event-driven cloud cost safeguard
shortDescription: >
  <p>An event-driven GCP pipeline that automatically disables billing on a project when a spending threshold is reached — preventing runaway cloud costs without manual intervention.</p>
introSection:
  title: What does it do?
  text: >
    <ul>
      <li>Triggers when a GCP Budget Alert fires</li>
      <li>Routes the event through Pub/Sub → Eventarc → Cloud Run Function</li>
      <li>Calls the Billing API to disable billing on the target project</li>
      <li>Each service runs under a dedicated service account with minimal IAM permissions</li>
    </ul>
backstorySection:
  text: >
    <p>Built during my work time at Capgemini to protect personal and client GCP projects from unexpected cost spikes. Cloud billing alerts are useful for visibility, but they don't stop charges — this pipeline closes that gap.</p>

    <p>The flow: a budget threshold triggers a GCP Budget Alert, which publishes a message to a Pub/Sub topic. Eventarc picks up that message and triggers a Cloud Run Function, which calls the Billing API to disable billing on the project.</p>

    <p>The main challenge was IAM — each service in the chain needs its own service account with the right permissions and no more. Getting that configuration right across Pub/Sub, Eventarc, Cloud Run, and the Billing API was the bulk of the work, and the experience gave me a solid grounding in how GCP's permission model works across interconnected services.</p>
detailsSection:
  title: Technical details
  parts:
    - title: Architecture
      text: >
        <ul>
          <li>GCP Budget Alerts (trigger)</li>
          <li>Pub/Sub (event propagation)</li>
          <li>Eventarc (event-driven trigger)</li>
          <li>Cloud Run Function (execution)</li>
          <li>Billing API (action)</li>
          <li>IAM Service Accounts (per-service, least privilege)</li>
        </ul>
---
