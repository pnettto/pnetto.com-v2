---
layout: layouts/post.njk
title: "Hawk: A new tab to-do app"
date: 2025-12-28
tags:
    - code
---

I love to use a notebook to organize my day. It makes me more productive to know what I need to do by having a quick look and it offloads things I'd otherwise have to remember, to the paper. But it can be a little annoying having to have the notebook on me to check what I need to next or add something to the list, so having it in the computer and the phone at the same time was something I wished for.

So I started looking for a to-do list app that was simple to use, beautiful, and that didn't want to eat and/or sell all my private data. It didn't work very well. So I set out to build a minimal application that could sit right at my new tab, which is something I use dozens of times per day. I usually enjoy having a beautiful picture from Unsplash on my new tab, but during work time I thought it might be nice to keep focused.

<div class="video-wrapper">
    <video
        src="/assets/media/hawk_demo.mp4"
        class="project-video"
        autoplay
        muted
        loop
        playsinline
    >
        <source src="movie.mp4" type="video/mp4" />
    </video>
    <p class="caption">{{ screen.text }}</p>
</div>

I wanted to build something that felt very similar to the experience I had on my paper notebook. Something frictionless, that I could just throw text at and it would work, auto save, never complain. Want to remove or replace a task, switch time, mark as done, add a comment (on the task or on the day)? You got it. Copy and paste between hours or days, navigate the calendar, see what has happened, show a full day view, a work hours view. Everything is one key down away. I love shortcuts, so I bundled my favorite ones in it.

The design was also important. It needed to be something very discreet, non-assuming, since I'd be seeing it every time I opened a new tab, which happens very often. So I went with a minimal, dark interface. The lack of buttons is my favorite part of this application. All the functionality is available on the interface items themselves. Click a space to add a task there, click under the tasks to add a note. There is almost nothing hinting at it, it's a secret language, which makes the tool become your (immaginary?) friend: you share something most people don't know :)

Tech wise it's not crazy. It's a to-do list. To-do lists are often the first example you will see in any javascript framework documentation. It's great because it's simple yet powerful. To make things a bit more fun for me, I decided to go completely vanilla js and create everything from scratch. Native web components, application flow, rendering, state management. All of this is just whipped up in the simplest way I could. It has been a fun experiment to create my dream to-do list with grassroots, "free", technology.

But then I wanted to start saving my data outside of the browser's storage facility to avoid losing all my precious data, so I connected it with a technology I did not work with before: Deno. It was a great opportunity to get acquainted with their cloud platform, Deno Deploy (great UI by the way!). And it was a very welcome surprise to learn that Deno (not only Deno deploy) ships with a no-config key-value database called KV. It's really a join to use (pun intended). Too bad there is no official client to navigate the db's contents just yet. I made a simple one for this project but it's a little rudimentary.

Coming back to Hawk, I'm quite happy to have a to-do list that gets out of my way in general and and top of it auto saves on the cloud, so that I can use the app both on the computer or the phone, which I often do.

The application is still private (as of Dec 2025) but I'm thinking about releasing it as an extension on the Chrome Web Store, maybe even with a premium version for people who want to save their encrypted notes on the cloud. But we're still a ways to go for that to happen. Right now it's in alpha stage, many things need fixing or polishing.

If you are interested in trying it, you can download the code here: <a href="https://github.com/pnettto/hawk">https://github.com/pnettto/hawk</a>, it's under the MIT license. Or if you just want to browse and see what Hawk feels like you can head to: <a href="https://hawk.pnettto.deno.net">https://hawk.pnettto.deno.net</a>.

Here's the feature list as of now:
- New tab Chrome extension ready
- Daily to-do list with checkbox
- Move tasks easily / Copy paste with comments and check state
- Comments for each task
- Daily notes
- Mood tracker
- Auto save everywhere / Multi device
- Calendar/date navigation
- Shortcuts to expand the features
- Zen mode (show a dark screen with an inspirational quote outside office hours, by default)

Many tasks are listed in the repository's backlog. We'll see how it pans out!