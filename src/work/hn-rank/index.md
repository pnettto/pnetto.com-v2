---
layout: layouts/work.njk
order: 1
featured: true
categories:
  - pet-projects
slug: hn-rank
title: "HN: Today by Points"
role: Author
url: https://github.com/pnettto/HN-rank
type: Chrome extension for Hacker News
shortDescription: >
  <p>A small Chrome extension that replaces the Hacker News front page with every story posted in the last 24 hours, ranked by points.</p>
introSection:
  title: What is it?
  text: >
    <ul>
      <li>Every story from the last 24h on one page, sorted by points</li>
      <li>Hides stories under 5 points, so new posts don't drown out the rest</li>
      <li>Looks like the normal HN front page, with a link back to the original order</li>
    </ul>
backstorySection:
  text: >
    <p>The HN front page mixes points with age, so a great story from this morning can already be gone by the afternoon. I wanted a simple "what was big today" view instead, so this extension pulls everything from the last day and sorts it by points.</p>

    <p>The code is on GitHub: <a href="https://github.com/pnettto/HN-rank" target="_blank">github.com/pnettto/HN-rank</a>.</p>
detailsSection:
  title: Technical details
  parts:
    - title: Data
      text: >
        <ul>
          <li>HN Search API (Algolia) for the last 24h of stories</li>
          <li>Fetched in the background script, since HN's security policy blocks it in the page</li>
          <li>Results cached for 5 minutes</li>
        </ul>
    - title: Stack
      text: >
        <ul>
          <li>Chrome extension, Manifest V3</li>
          <li>Vanilla JavaScript, ~100 lines</li>
        </ul>
---
