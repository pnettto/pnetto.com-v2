---
layout: layouts/work.njk
order: 6
featured: true
categories:
  - pet-projects
slug: cli-command-explainer
title: CLI Command Explainer
role: Author
url: https://gist.github.com/pnettto/112c74187c062a0e8af919c1be2c5357
coverImage: cover.png
screensSection:
  - media: cover.png
type: Bash CLI tool powered by OpenAI
shortDescription: >
  <p>A small Bash utility that explains any CLI command and its flags in plain English — useful when learning new tools where argument syntax isn't always obvious.</p>
introSection:
  title: What is it?
  text: >
    <ul>
      <li>Run <code>explain &lt;any CLI command&gt;</code> in your terminal</li>
      <li>Sends the command to OpenAI and returns a concise plain-English explanation</li>
      <li>Useful for quickly understanding unfamiliar flags and options</li>
    </ul>
backstorySection:
  text: >
    <p>Built while going through a period of learning several new CLI tools at once. With flags and options flying around, having a fast way to understand what a command actually does — without leaving the terminal to search — turned out to be genuinely useful day-to-day.</p>

    <p>The implementation is deliberately minimal: a single Bash function that takes the full command as input, sends it to the OpenAI API, and prints the response. No installation, no UI, just a function you source into your shell.</p>

    <p>Example: <code>explain ping -c 3 pnetto.com</code> returns: <em>"ping sends network packets to the specified host to check connectivity. -c 3 sends exactly 3 packets then stops."</em></p>

    <p>Available as a <a href="https://gist.github.com/pnettto/112c74187c062a0e8af919c1be2c5357" target="_blank">GitHub Gist</a>.</p>
detailsSection:
  title: Technical details
  parts:
    - title: Stack
      text: >
        <ul>
          <li>Bash</li>
          <li>OpenAI API</li>
          <li>~20 lines of code</li>
        </ul>
---
