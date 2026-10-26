---
layout: layouts/work.njk
order: 1
featured: true
categories:
  - pet-projects
slug: hn-skin
title: "HN Skin"
role: Author
url: https://github.com/pnettto/HN-skin
coverImage: cover.png
screensSection:
  - media: cover.png
    text: Story list
  - media: screen-2.png
    text: Comment thread
  - media: screen-3.png
    text: Past front pages by date
type: Chrome extension for Hacker News
shortDescription: >
  <p>A Chrome extension that changes the layout of Hacker News: themes, collapsible threads, keyboard navigation and a date picker for past front pages.</p>
introSection:
  title: What is it?
  text: >
    <p>An alternative layout for Hacker News. It parses HN's existing pages and renders them in a single column with light, dark and sepia themes. Comment threads can be collapsed, comments added since the last visit are marked, and the Past tab can be browsed by date. Voting, replying and logging in still go through HN itself.</p>

    <p>Not affiliated with Hacker News or Y Combinator.</p>

    <p>The code is on GitHub: <a href="https://github.com/pnettto/HN-skin" target="_blank">github.com/pnettto/HN-skin</a>.</p>
detailsSection:
  title: Technical details
  parts:
    - title: How it works
      text: >
        <ul>
          <li>Content scripts read HN's table markup and build a new interface from it</li>
          <li>Votes, hides and replies call HN's own endpoints</li>
          <li>Read history is kept in local extension storage</li>
          <li>Falls back to the original page if rendering fails</li>
        </ul>
    - title: Stack
      text: >
        <ul>
          <li>Chrome extension, Manifest V3</li>
          <li>Vanilla JavaScript and CSS, no build step</li>
        </ul>
---
