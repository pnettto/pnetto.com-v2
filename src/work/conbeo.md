---
order: 2
featured: true
categories:
  - development
  - entrepreneurship
slug: conbeo
title: Conbeo
client: Conbeo
role: Co-founder / Front-end developer / UX Analyst
year: 2018/2019
url: https://conbeo.com
logo: logo.svg
coverImage: cover.png
nanoDescription: Website & Admin panel
shortDescription: >
  <ul>
    <li>Headless CMS (Wordpress)</li>
    <li>Website (Gatsby)</li>
    <li>Admin panel (Angular)</li>
  </ul>
introSection:
  title: Main Challenges
  text: >
    <ul>
      <li>Create an intuitive navigation experience since tourism marketplaces conversions are usually made fast</li>
      <li>Make each page load very fast for better SEO</li>
      <li>Create a friendly and efficient checkout flow</li>
    </ul>
screensSection:
  - image: cover.png
    text: "The cover page, very fresh and intuitive. It's easy to get going with the tour search, thanks to UX tweaks and user tests."
  - image: 1.png
    text: "The Book a Tour page, designed to allow the user find tours quickly but also to discover opportunities they might not be considering."
  - image: 2.png
    text: "The Tour page. We hid the complexity of having a lot of content in one page by making use of simple menus which stick to the top as the user scrolls and by hinting at the multiple pictures a gallery can have on top. The booking box is a dialog of it own, responding to the user with useful feedback as they try to find the perfect tour."
  - image: 3.png
    text: "Here's the articles page, called Travel Guide. We have created an entire content strategy to up our domain authority, among other SEO indicators, and get more visitors onto the site."
  - image: 4.png
    text: "The login page for Tour Operators. Unfortunately I'm not able to show the insides of this system, but it's an Angular 6 app which allows them customize their tour pages, their own CMS. They can also see bookings, reports, statistics and the like."
  - image: 5.png
    text: "A search modal overlays the whole site once the search button has been clicked. Maybe the color choice wasn't the best, but it worked like a charm!"
  - image: 6.png
    text: "Several informational pages were in place to inform the visitors about the possibilities of engaging with us. Here, a page made for Tour Operators who want to be part of our marketplace."
backstorySection:
  text: >
    <p>Conbeo is a marketplace for travel agents in Vietnam of which I am a co-founder and front-end developer. The travel companies can use our platform like an Airbnb for their tours. The system offers an administration panel where tours and bookings can be managed, plus an attractive website where those same tours get to be displayed and booked by visitors.</p>

    <p>My main activities on this endeavour are:</p>
    <ul>
      <li>Take part in strategic decision-making</li>
      <li>Design great user experience for our website and product in general</li>
      <li>Code all necessary bits to implement all this</li>
    </ul>


    <p>This project is composed of two parts:</p>

    <h4>Website</h4>
    <p>Initially we had a monolithic Wordpress website. As always I crafted the theme from scratch to making sure the good old WP remained lightweight and fast to load. But when we needed even more speed and the possibility of creating static pages more easily for SEO purposes I migrated the whole infrastructure to a Gatsby app, with a neat DevOps implementation to make sure all the content is consistently updated.</p>
    <p>The result is a lightning fast website with a great mobile experience and a considerable ease of expansion to accommodate new features and demands.</p>
    <p>Note: As of now the website is on hold due to the lack of business in tourism after the pandemics started, so it’s not currently possible to book or manage tours.</p>

    <p>Main technologies:</p>
    <ul>
      <li>React + Gatsby</li>
      <li>Headless Wordpress CMS</li>
      <li>Static hosting in AWS with automatic builds</li>
    </ul>


    <h4>Administration system</h4>
    <p>The travel operators who work with us have access to an administration system where they can manage all the details of their tours (descriptions of everything, availability, pricing, image gallery, etc), list and unlist them, see their bookings’ information and access a report page. These operations are made possible by consuming an API created in Java by Þorgeir Karlsson, our other developer.</p>

    <p>Main technologies:</p>
    <ul>
      <li>Angular 6</li>
      <li>Integration with Conbeo’s API</li>
      <li>Static hosting in AWS</li>
    </ul>
---
