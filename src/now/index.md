---
layout: layouts/base.njk
title: Now
containerClass: narrow
---

<section id="timeline" class="post-content">
<h2 class="underlined">Timeline</h2>

Things I've noticed, made, or explored.

<div class="timeline">
<div class="timeline-item">
<div class="timeline-year" id="now">Now</div>
<a href="#now"></a>
<div class="timeline-content">

- Topics
  - Google Cloud certifications
  - Networking (firewalls, packet sniffing 👃)
- Links
  - [https://addyosmani.com/blog/21-lessons/](https://addyosmani.com/blog/21-lessons/)
    Great text text by Addy Osmani on being a senior engineer and his learnings after 14 years at Google. These are the parts that I realated to and/or will take with me: The engineer who truly understands the problem often finds that the elegant solution is simpler than anyone expected. / Being right is cheap. Getting to right together is the real work.  / The senior engineers I respect most have learned to trade cleverness for clarity, every time. / Your code doesn’t advocate for you. People do.  If no one can articulate your impact when you’re not in the room, your impact is effectively optional. / The act of making something legible [writing] to someone else makes it more legible to me. / Priceless and invisible is a dangerous combination for your career. / Your job isn’t forever, but your network is. Approach it with curiosity and generosity, not transactional hustle. / The fastest code is code that never runs. / Write - not for engagement, but for clarity. Build reusable primitives. Collect scar tissue into playbooks.

  - [https://partner.skills.google/paths/77](https://partner.skills.google/paths/77)
    Will start this or a related path at Google
    SKills this week, as part of my internship.
  - [https://news.ycombinator.com/item?id=46488576](https://news.ycombinator.com/item?id=46488576)
    It was fun to read this Hacker News discussion about how AI tools have been bringing joy to many developers who are now feeling much more productive in their personal projects and learning. Of course, there's a lot of controversy, but personally I tend to agree with the ones who are having fun. I haven't learned this much about coding and tech architecture in a long time. LLMs not only provide me with interesting examples for specific cases, but can also explain the reasoning behind it, which is massive for fast learning. As for the quality of the outputs, I remember a wise person told me once: it's not about being perfect, it's about being better! We all still have got a brain to analyse the results and judge, haven't we? Meanwhile, another HN post showed a [sad chart](https://data.stackexchange.com/stackoverflow/query/1926661#graph) where it's clear that Stack Overflow, a previous favorite for coding Q&A and examples, is done and done.
  - [https://www.cs.cmu.edu/~pavlo/blog/2026/01/2025-databases-retrospective.html](https://www.cs.cmu.edu/~pavlo/blog/2026/01/2025-databases-retrospective.html) Andy Pavlo give his roundup. It caught my attention how Postgress, a technology I've used right at beginning of my career, is not only still going strong in 2025 but being seriously invested in by every major cloud vendor. Also, I didn't know Databricks had raised so much cash, it's crazy.

</div>
</div>

<div class="timeline-item">
<div class="timeline-year" id="2026-01-week-01">2026-01 / week 01</div>
<a href="#2026-01-week-01"></a>
<div class="timeline-content">

- Topics

  - Cloudflare Storage
  - Deployment pipelines on Github
  - Deno apps
  - Git submodules vs. CDN vs. subtrees: ways to share code among projects
  - AI: Embeddings and Vector search
  - AI: Embeddings and Vector search
  - Python `threading` module

- Artifacts

  - Built [Spotify Client](https://demo-garden.pnetto.com/spotify), A way to visualize and browse my Spotify albums better
  - Built a CI/CD [pipeline](https://github.com/pnettto/design-system/blob/main/.github/workflows/cdn.yml) for my UI Kit which allows me to continuously publish improvements to "latest" and to version them with my [bump](https://github.com/pnettto/design-system/blob/main/bump.sh) script.
  - http://pnetto.store is my new Cloudflare powered CDN. This website's media assets and my homemade [UI Kit](https://pnettto.github.io/design-system/) are now hosted there (where?).
  - Career reflections: what valueable skill$ do I have? Where do I want be? Which of these move me the most: being an engineer or a business person? ([Very WIP reflection](/other/professional_profile_wip/))
  - LLM-slopped a project to mimic what the amazing [Scry](https://exopriors.com/scry) might do internally. [See slop](https://github.com/pnettto/slop-vector-seach/).

- Links
  - [https://henry.codes/writing/a-website-to-destroy-all-websites/](https://henry.codes/writing/a-website-to-destroy-all-websites/) - Beautiful (in and out) post about the forgotten (or forsaken?) potential of the web. Plus great reading and small web browsing tips.
  - [https://exopriors.com/scry](https://exopriors.com/scry) - Incredible tool that uses vector databases to bring semantic search to millions of documents and spit out interatable SQL queries. It went mostly right over my head but it was intriguing enough for me to slop a [prototype](https://github.com/pnettto/slop-vector-seach/) It also nudged me towards reading on [SQlite FTS5](https://www.geeksforgeeks.org/sqlite/sqlite-full-text-search/).
  - [Tracy Chapman Refuses to Join Social Media (10 years ago)](https://www.youtube.com/watch?v=ctBGyXzu5Ao) - Got reminded of her incredible voice through a [great track](https://open.spotify.com/track/4vDBJeeQCbhP9FaPPMsYkY?si=f55d5e3b977d4a90) and went on to find a message I really needed to hear.

</div>
</div>

<div class="timeline-item">
<div class="timeline-year" id="2025-12">2025-12 / week 52</div>
<a href="#2025-12-week-52"></a>
<div class="timeline-content">

- Created Demo Garden, a space to host small experiments in whatever environment can be Dockerized. It features my own lazy loader, which wakes the services up on demand, which allows me to host hundreds of these in a tiny AWS E2-micro VM instance. [Dashboard](https://demo-garden.pnetto.com) / [Github](https://github.com/pnettto/demo-garden) / [Blog post](/logs/demo-garden)
- Created an UI Kit to make it easier to transport my style into other projects. [Showcase](https://pnettto.github.io/design-system/) / [Github](https://github.com/pnettto/design-system).
- Created an Code code-executor. [Demo](https://demo-garden.pnetto.com/apps/code-executor.html) / [Github](https://pnettto.github.io/code-executor/)
- Published Winter Lights [photo album](/photos/winter-lights).
- Created this website. [Blog post](/logs/pnetto-com)
- Created Hawk, my own to-do app. [Blog post](/logs/hawk)
- Started at Capgemini as a Data Engineering Intern 🏁

</div>
</div>

</div>
</section>
