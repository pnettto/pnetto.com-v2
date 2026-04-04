---
layout: layouts/work.njk
order: 2
featured: true
categories:
  - pet-projects
slug: spotify-client
title: Spotify Client
role: Author
url: https://demo-garden.pnetto.com/spotify/
coverImage: cover.png
screensSection:
  - media: cover.png
type: Personal Spotify browser
shortDescription: >
  <p>A custom Spotify interface for browsing and visualizing a personal music library. Built as an experiment with the Spotify API and hosted on Demo Garden.</p>
introSection:
  title: What is it?
  text: >
    <ul>
      <li>Connects to the Spotify API via OAuth to read library data</li>
      <li>Provides a more visual, browsable alternative to the default Spotify album view</li>
      <li>Hosted on Demo Garden as a containerized app</li>
      <li>Includes a scrobbler to keep track what I have been listening to</li>
    </ul>
backstorySection:
  text: >
    <p>The default Spotify UI makes it hard to browse a large album library — albums are shown in a grid with little information density, and there is no way to sort or filter them the way I wanted. This project started as a way to visualize my own Spotify library more clearly and in a more fun way (it lets me filter by genre for example), and it was a good excuse to work with the Spotify Web API for the first time.</p>

    <p>It also became a useful early test of the Demo Garden's ability to host apps that depend on OAuth flows and external APIs — not just static sites or purely backend services.</p>
---
