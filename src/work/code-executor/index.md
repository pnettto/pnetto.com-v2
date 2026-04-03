---
layout: layouts/work.njk
order: 3
featured: true
categories:
  - pet-projects
slug: code-executor
title: Code Executor
role: Author
url: https://demo-garden.pnetto.com/apps/code-executor.html
coverImage: cover.png
screensSection:
  - media: cover.png
type: Sandboxed code execution environment
shortDescription: >
  <p>A lightweight, sandboxed environment for running code snippets in multiple languages directly in the browser — without any setup.</p>
introSection:
  title: What is it?
  text: >
    <ul>
      <li>Runs Python, SQL, Bash, JavaScript, and Deno in a sandboxed container</li>
      <li>Isolated execution environment — no persistent state between runs</li>
      <li>Hosted as part of Demo Garden, wakes on demand</li>
      <li>Similar in concept to Judge0 or Piston, but minimal and self-hosted</li>
    </ul>
backstorySection:
  text: >
    <p>Built as an experiment in sandboxed execution and as a useful addition to Demo Garden. The goal was a simple tool to run code snippets quickly without spinning up a local environment — useful for testing ideas, demonstrating concepts, or teaching.</p>

    <p>The execution environment runs inside a Deno container with restricted access. It became one of the first services hosted on Demo Garden, which made it a good test case for the lazy loader and the broader platform architecture.</p>

    <p>Source code: <a href="https://github.com/pnettto/code-executor" target="_blank">github.com/pnettto/code-executor</a>.</p>
detailsSection:
  title: Technical details
  parts:
    - title: Stack
      text: >
        <ul>
          <li>Deno (runtime + sandboxing)</li>
          <li>Docker (containerized execution)</li>
          <li>Hosted on Demo Garden (AWS EC2 + lazy loader)</li>
        </ul>
---
