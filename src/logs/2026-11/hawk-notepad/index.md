---
layout: layouts/post.njk
title: "Hawk update: tasks, notepad and files"
date: 2026-11-09
tags:
    - tech
    - 2026-11
---

[Hawk](/logs/hawk/) started as a new tab to-do list with a slot for each hour of the day and a short note underneath. This update turns it into a small daily workspace: a task list, a notepad and a place for files, all in the same tab and synced across devices.

The task list is now looser. Instead of fixed hours, each day is a plain list where some tasks have a time and others don't, which is closer to how a day actually goes.

{% assign imageTasks = globalAllPhotos | matchPhotosource: 'hawk-nov-update-tasks.png' %}
{% optmizedImageTagMd imageTasks, "(min-width: 1140px) 70vw, 100vw" %}

<p class="caption">A day's tasks</p>

Notes got the biggest change. The old split between day notes and collections is replaced by a single Notepad, where notes are grouped by the #tags written in them rather than by folders. Notes written for a specific day live there too, so the journal and the notepad are two views of the same notes.

{% assign imageChecklist = globalAllPhotos | matchPhotosource: 'hawk-nov-update-checklist.png' %}
{% optmizedImageTagMd imageChecklist, "(min-width: 1140px) 70vw, 100vw" %}

<p class="caption">A note in the Notepad</p>

The editor behind those notes also handles more than text now, with checklists, tables, images and video, and it keeps the formatting of content pasted from other apps.

{% assign imageTable = globalAllPhotos | matchPhotosource: 'hawk-nov-update-table.png' %}
{% optmizedImageTagMd imageTable, "(min-width: 1140px) 70vw, 100vw" %}

<p class="caption">A table in a note</p>

Files have their own tab, backed by Cloudflare R2, where uploads and media from notes are kept together and grouped by day.

{% assign imageFiles = globalAllPhotos | matchPhotosource: 'hawk-nov-update-files.png' %}
{% optmizedImageTagMd imageFiles, "(min-width: 1140px) 70vw, 100vw" %}

<p class="caption">The Files tab</p>

Edits made on two devices at once are now merged instead of overwriting each other. The code is at <a href="https://github.com/pnettto/hawk">github.com/pnettto/hawk</a>.
