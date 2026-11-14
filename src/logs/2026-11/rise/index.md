---
layout: layouts/post.njk
title: "Rise: making music with Claude and Ableton"
date: 2026-11-14
tags:
    - tech
    - hobby
    - 2026-11
---

<audio class="audio" controls src="/assets/media/009.mp3"></audio>

<p class="caption">Rise (10 min) — the final version</p>

This weekend I made a 10-minute New Age piece called Rise, and I barely touched a knob. I wrote what I wanted, Claude built it inside Ableton Live, I listened and complained, and we went around like that for about three hours.

The magic piece is [ableton-mcp](https://github.com/ahujasid/ableton-mcp), an MCP server that lets an AI agent talk to Ableton: create tracks, write MIDI notes, load instruments and effects, and twist their parameters. It can't do everything, but it can do enough to build a whole song from an empty set. I ran it from [pi](https://pi.dev), the coding agent I use daily, with Claude Opus as the model.

## The start

The first night was mostly about getting things to work. The setup needed changes outside pi's sandbox, so the agent wrote a plan file and I ran a second agent without the VM to follow it. Agents writing instructions for other agents, what a time to be alive.

Once the connection was there, we made a lullaby. Then I added bells I couldn't hear, then a control panel with knobs, and then, around 1am, I decided the lullaby should become a stoner doom metal song. I was arguing about ride versus crash cymbals at 3am. No regrets.

It was silly, but it showed me the real lesson: this works much better as a conversation than as a one-shot prompt.

## The middle

The next morning I asked for a 10-minute New Age song that's soothing and uplifting. The first version was decent but repetitive (one 8-bar progression looped for 10 minutes). So I asked for more texture. That version was "too crazy" for anybody trying to meditate.

I told it to look into Golden Brown for inspiration, and it confidently built a waltz based on The Stranglers' hit. I meant Golden Brown the artist, Stefan Beck, who builds ambient music on drones, guitar and cello. Fair enough, my fault for not being specific.

The bigger problem was that Claude can't hear. So I'd export renders from Ableton into the project folder, and it measured them with Python — loudness, frequency balance, stereo width, notes per minute — and compared them against a Golden Brown montage I'd dropped in as a reference.

{% assign imageMix = globalAllPhotos | matchPhotosource: 'rise-mix-pass.png' %}
{% optmizedImageTagMd imageMix, "(min-width: 1140px) 70vw, 100vw" %}

<p class="caption">A mix pass: what I complained about, what the analysis found, and what got changed</p>

From there it was a lot of back and forth between two extremes. One version was "a really long nothingness", with no story. The fix came out as "a full on pop song" with a robotic piano. The version that clicked was in between: the piano plays in free time, and the only melodic idea is three notes that come back rarely, like a mantra. The story comes from the harmony and the space, not a tune you'd hum. After that it was all about sound — swapping synths for sampled instruments and real recordings until it felt organic.

## The end

After three hours I had a piece I really like and a very long conversation. A conversation that long gets slow and expensive, so I asked Claude to write everything down. It produced a handoff document with the whole story, and — my favourite part — a sound style guide describing my taste. Now a fresh agent can read it and, if I say "make a song that inspires Hope in a similar style", it knows exactly what I mean: warm, organic, woody, unhurried, human.

I like that this is my taste, written down by someone who learned it the hard way, one complaint at a time.

## Some thoughts

What surprised me most is how good it feels to direct without operating. I'm not a producer, and I'd never have gotten to this sound in three hours on my own. My job was just to listen carefully and say what I felt; Claude did all the clicking, the music theory and the mixing.

It's not perfect. It can't hear, so every change is a guess until I export and listen. It got Golden Brown wrong, and some ideas were just bad. But it was quick to own mistakes and got better the more it knew what I wanted. Pretty much how working with people goes too.

Next up: Hope. We shall see!
