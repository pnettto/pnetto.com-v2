---
layout: layouts/work.njk
order: 1
featured: true
categories:
  - development
slug: de-linde
title: de Linde
client: Mogens de Linde & Limbo (DK)
role: Full stack developer
year: 2020/2021
url: https://delinde.dk
logo: logo.png
coverImage: cover.png
type: Next.js Website & Back-end
shortDescription: >
  <ul>
    <li>Custom Headless CMS (WP)</li>
    <li>Custom Gutenberg blocks</li>
    <li>Website (Next.js)</li>
    <li>Flexible PDF generator</li>
  </ul>
introSection:
  title: Main Challenges
  text: >
    <ul>
      <li>Create an ellegant and polished experience, making sure to communicate de Linde’s service</li>
      <li>Create intuitive and seamless CMS</li>
      <li>Develop a really powerful PDF generator</li>
      <li>Seamlessly plug into <a href="https://limbo.works" target="_blank" rel="noopener">Limbo's</a> work flow</li>
    </ul>
screensSection:
  - media: cover.png
    text: "The cover page. 3 versions of this page were created for more flexibility on the editor's side."
  - media: 1.png
    text: "The Property page. Here the user has a clear view of what they have at their disposal in this rather long page. It counts on scroll spies, modal gallery, floor plan carousel, conditional rendering according to what is available for this specific property and more."
  - media: 2.png
    text: "This is the Property Search page. The filters are synced with the Wordpress custo taxonomies and each property has a carousel gallery."
  - media: 3.png
    text: "The Portfolio page. It takes information from a custom type in Wordpress and neatly organizes the grid using a pure CSS masonry effect."
  - media: 4.png
    text: "An example of the modular components in this site. My custom Gutenberg superblock makes sure all pages can composed in the way that makes more sense for that context. In the detail, an automatically inverted column makes this process even easier."
  - media: 5.png
    text: "Another example of a part composed with my Gutenberg superblock."
  - media: 6.png
    text: "The menu, sliding from the right. In the detail it's possible to see how the upper menu, which seems to be part of the page below actually pops up over this hidden side menu, giving more functionality and life to the site."
  - media: 7.png
    text: "Another Gutenberg superblock example, this time it's the carousel, to which I made sure to add an option (in the CMS) to make it small or very large, in order to acommodate the design."
  - media: 8.png
    text: "The team component, constructed from a custom type in Wordpress, also making use of custom taxonomies to organize the teams. In the CMS, I created a dedicated block to make the content creation seamless, by using a similar interface to this component."
  - media: 9.png
    text: "The Article page shows how much control the user has. A standard format was never set, being the editor in charge of choosing which parts from the Gutenberg superblock they want to show in this specific article."
backstorySection:
  text: >
    <p>Mogens de Linde is a Danish company that renews buildings with great care, taking in account their historical background and peculiarities that make them unique, since 1975.</p>
    <p>In 2020, a collaboration with <a href="https://limbo.works" target="_blank" rel="noopener">Limbo</a> gave me the honor of coding their new website in order to make their work pop out of the screen and give them the life they deserve. The design, by Romain Gorisse, highlights the great picture collection (both historical and contemporary), which made it look absolutely beautiful, along with its minimal aesthetics.</p>
    <p>This project is made of 3 parts: Content Management System, Website and PDF Generator. </p>
    <h4>Content Management System</h4>
    <p>This was the most technically challenging part of this project. Romain designed a modular system, where pages could be assembled with a combination of the available modules, for the most part. </p>
    <p>To meet this requirement, I leveraged Gutenberg, Wordpress’ newest editor to create my own Gutenberg Block, which has a custom interface that allows the administrator to select whatever module and compose any given page. </p>
    <p>I proceeded to “lock” pages of certain types to certain Gutenberg Blocks templates. The result is that the CMS is very easy to use, and at the same time very powerful. If you are interested in knowing more about it, just write me a line, I’ll be glad to share my process with you.</p>
    <h4>Website</h4>
    <p>The website allows the user to navigate through the content with ease of an app (despite the large number of pages). The large images posed a challenge since they could easily make the navigation glitchy while they loaded, but thanks to intensive coding work they are loaded as small as possible for each device and only appear when the user is close to revealing them via scrolling.</p>
    <p>The content is sourced via custom REST routes which serve Gutenberg’s information as JSON strings that are simple to consume.</p>
    <p>The application itself is a NextJS implementation, which allows us to generate static pages with ease and at the same time refresh the generated content every time we have new entries or changes. Also it made it possible to create “cloud Node functions” in a straightforward manner, which came in handy.</p>
    <p>Needless to say, the React environment NextJS makes available was very valuable when implementing the equivalents to the Modules created inside Gutenberg.</p>
    <h4>PDF Generator</h4>
    <p>The third part of this solution was a PDF generator. It is a Node app that uses Puppeteer to visit a specific page on the NextJS site, which has a layout that’s made for this purpose, and generate a PDF file out of it. Then, it sends the file back to the user. It has a custom caching and refreshing system that allows for faster downloads.</p>
    <p>This feature was core to the solution since PDFs are very valuable in de Linde’s industry and what they had before was not as polished or flexible. With my code they are now able to throw whatever contents at the CMS and have a nice PDF file be generated.</p>
detailsSection:
  title: Technical details
  parts:
    - title: Back-end
      text: >
        <ul>
          <li>Headless CMS (Wordpress)</li>
          <li>Custom API implementation to expose Gutenberg blocks as clean and easy-to-use JSON</li>
          <li>Creation of a Gutenberg “Super Block” which encapsulates all available components in the design (React)</li>
          <li>CMS design made to be similar to the end result</li>
        </ul>
    - title: Front-end
      text: >
        <ul>
        <li>NextJS application</li>
        <li>Division of all possible components and re-utilization of code</li>
        <li>Creation of a “Component-routing” super component to treat the CMS data, making for a powerful and flexible way to compose pages as an editor</li>
        <li>Extensive use of scroll spies without loss in performance</li>
        <li>Custom image component to improve loading time</li>
        <li>Creation of a PDF page, which serves as a flexible template for use with an external Puppeteer/Node app</li>
        </ul>
    - title: PDF Generator
      text: >
        <ul>
          <li>Custom Node application</li>
          <li>Makes use of headless browser Puppeteer to visit the NextJS application and create PDFs before caching and serving them to the user</li>
        </ul>
    - title: Infrastructure
      text: >
        <ul>
          <li>Development integrated with Vercel, making use of feature branches (Preview URLs) for testing and QA</li>
          <li>Deployed on a Linux VPS, making use of Apache and pm2</li>
        </ul>
---
