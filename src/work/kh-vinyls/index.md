---
layout: layouts/work.njk
order: 1
featured: true
categories:
  - pet-projects
slug: kh-vinyls
title: Kulturbiblioteket Vinyl Finder
role: Author
url: https://pnettto.github.io/kh-vinyls/
coverImage: cover.png
type: Searchable catalogue of a library's vinyl collection
shortDescription: >
  <p>A searchable catalogue of the ~15,000 vinyl records you can borrow at Kulturbiblioteket in Kulturhuset Stadsteatern, Stockholm. Browse as a cover wall or list, filter by genre, year and country, and explore the collection through charts.</p>
introSection:
  title: What is it?
  text: >
    <ul>
      <li>Browse ~15,000 records as a cover wall or list, with search and genre, year and country filters</li>
      <li>A stats page with charts about the collection</li>
      <li>Built from the library's 13 PDF lists plus the Stockholm Public Library catalogue</li>
      <li>Genres, countries and 3,786 covers added on top, always showing what is confirmed and what is inferred</li>
    </ul>
screensSection:
  - media: cover.png
    text: Browsing the collection as a cover wall
  - media: stats.png
    text: Stats about the collection
backstorySection:
  text: >
    <p>Kulturbiblioteket lends out around 15,000 vinyl records, but the only way to see what's there is a set of PDF lists split by section. Great collection, hard to explore. So I turned the lists into something you can actually browse. Each of the available 13 catalog PDFs is parsed record by record, and newer albums come from the Stockholm Public Library catalogue.</p>

    <p>It's an independent, non-commercial project, not affiliated with Kulturhuset Stadsteatern or Stockholms stadsbibliotek. The code is on GitHub: <a href="https://github.com/pnettto/kh-vinyls" target="_blank">github.com/pnettto/kh-vinyls</a>.</p>
detailsSection:
  title: Technical details
  parts:
    - title: Data
      text: >
        <ul>
          <li>PDF parsing of the library's 13 section lists</li>
          <li>Stockholm Public Library catalogue for newer vinyl</li>
          <li>MusicBrainz data dump + Cover Art Archive for covers</li>
          <li>Rule-based classical tagging, LLM tagging for everything else</li>
        </ul>
    - title: Stack
      text: >
        <ul>
          <li>Vanilla HTML, CSS and JavaScript</li>
          <li>Static data file, no build step</li>
          <li>GitHub Pages</li>
        </ul>
---
