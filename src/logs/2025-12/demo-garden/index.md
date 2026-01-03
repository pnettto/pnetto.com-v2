---
layout: layouts/post.njk
title: Demo Garden
date: 2025-12-31
tags:
    - tech
    - 2025-12
---

Often when I'm around the interwebs, reading texts about cool technology or watching a video that showcases some interesting tool, I get this itch to create a new folder in ~/Development and drop a hello world in there. 

There's something satisfying about seeing someone's work - a demo or a script, for example, unwrap before my eyes. Not in their computer or their server across the world, but in my own machine, where I can touch and shape and break the files. 

It’s a ritual that belongs to any developer’s daily life and it might sound dry, but the magic of running code is one of the reasons why I became a programmer. Watching code being executed as if it had some life, like an automata, is mesmerizing.

{% assign imageAutomata = globalAllPhotos | matchPhotosource: 'demo_garden_automaton.gif' %}
{% optmizedImageTagMd imageAutomata, "(min-width: 1140px) 70vw, 100vw" %}

<p class="caption">Real wooden automata by <a href="https://eulique.com/collections/wooden-automata" target="_blank">Eulique</a></p>

Some days, those hello worlds evolve into my own applications. I will change them up, or create an analogous product, or just get inspired and create something unrelated. It’s often too small to tell anyone about it, but most times it ends up adding some knowledge or some skill to my bucket.

And as I started getting in touch with more and more technologies at Capgemini, where I’m doing an internship, I caught myself wanting to document the process of trying all these new things.

## Ideation

My first thought was that my experiments might start getting too scattered in all my infrastructure accounts like GCP, AWS, Azure, Heroku, Vercel, Fly.io, etc, and not only I might end up with a weak shareability and documentability, but also as soon as these accounts start expiring due to their trial nature, I’d risk losing my history of learnings.

So the challenge was to create a space that could host entire heavy duty applications like Airflow, side by side with static sites, python APIs, Go workers, Deno apps… the kinds of projects that require building pipelines. Then I’d also need access to infrastructure like databases and sandboxed environments.

I envisioned a space that I owned, where I could feel comfortable hosting things and forgetting about them until the next time I needed them, and where I could centralize my prototypes. A place that was basically stateless, that could be whipped up quickly again if a big crash happened. Oh, and also… for free. Thus was Demo Garden born!

The suffix “Garden” was chosen thinking of Digital Gardens, spaces where people post links to pages they like and little creations of their own. The idea is that you build it up over time, without pressure for it to be “perfect”, but you're constantly moving, trimming, nurturing it. I love this, and it transfers really well to the world of demos, which can be so rough and still so valuable.

## The implementation

I ended up in a week-long journey to create an environment that heavily relied on Docker and chose a GCP E2-micro instance to host it. Here is how it works:

1) **[Demo Garden Website or External client]**
   - Requests a resource, maybe a static site, maybe hits an API endpoint
2) **[Nginx Reverse Proxy]**
   - This gatekeeper listens to the request, figures out which Docker container contains the application that will respond to that correctly
   - If the container is meant to be “lazy”, it relays it to the Lazy Loader
   - Otherwise it means the app is alive and hard at work, and Nginx forwards the request
3) **[Lazy Loader] - A custom 1-file Go app**
   - Verifies if the requested container is awake
   - If yes it relays the request
   - If not, it will start the container and then relay the request
   - It will also keep an eye on idle containers and deactivate them to save my sad 1GB ram memory
4) **[Services]**
   - These can be almost anything running inside a container. For example, I have a Deno app that executes arbitrary code in a sandboxed environment and returns the result (like Judge0 or Piston, but much more lightweight). This environment is also custom made, and the code is right [here](https://github.com/pnettto/code-executor).
5) **[Sub-Services]**
   - A service can depend on further containers, for example a worker or a database. This is showcased in my demo [Parallelism](http://demo-garden.pnetto.com/apps/parallelism.html), which spawns a Go worker from a FastAPI app and reads from a Postgres database before returning).
   - One cool thing is that the Lazy Loader will also clean up these dependencies after a set idle time, unless I specify they shouldn’t go down.
6) **[Response]**
   - Finally, a response. The user smiles with joy and the containers get a well deserved rest.

This little system is, as far as I can see, really resource efficient. It runs on a very simple vm instance, the E2-micro, with only 1GB RAM memory and slow vCPU. Still, when nothing is being requested, the docker applications (nginx and lazy loader) only take up around 10MB of RAM!

{% assign image = globalAllPhotos | matchPhotosource: 'demo_garden_memory.png' %}
{% optmizedImageTagMd image, "(min-width: 1140px) 70vw, 100vw" %}

At first I used Python for the lazy loader and it took a whopping 60Mb on its own, so I switched to Go, a language I haven’t worked with before but now thanks to an LLM-enhanced learning approach, I could not only understand it much better but also to migrate my Python code into Go quickly.

I’m also quite happy with the CI/CD experience. I’m using Github Actions to pre-build images outside of my tiny VM to avoid strain on the poor machine, caching aggressively to cut down on runner time, and then copying over my project and restart Docker via ssh. The whole process, from push to deployment takes 40s. FORTY SECONDS. Pretty good, I’m happy.

## The dashboard

I have also whipped up a dashboard for the Demo Garden real quick (thanks Flash 3) and I think I might use it to standardize the way I’ll share the demos. Maybe every demo will have a page where the visitor can see a description of what has been done on a sidebar and a built-in demo on the side displaying the final result. Like [this example](https://demo-garden.pnetto.com/apps/code-executor.html).

## Afterglow

Creating all this has been a super informative process and a great opportunity to learn about Docker. Of course, I could very well just deploy these little services on Netlify or Fly.io and call it a day. But sometimes creating your own infrastructure offers insight that you’re never going to get by pressing buttons on a pretty UI. I enjoy that too (hello Digital Ocean 🫶), but I’m trying to say there’s absolutely some value to this more involved process.

For example, I always wondered how applications went to sleep in deployment platforms like Streamlit.app, Heroku, Glitch.io, etc. Now I can understand that flow a bit better, and dare I say, could even try to match their implementation with more time and dedication. That’s a nice feeling!

At the moment I’m working on a way to containerize the “base OS” as well so that it's easier to port the whole environment elsewhere, and even try to create a Kubernetes cluster sometime soon. I’d love to see how this thing scales and what kinds of challenges would arise from there. 

Another feature I’m looking into is how to use git submodules for the services. I want to be able to deploy the services as standalone applications some times, and it might be a good way to avoid the Demo Garden repo becoming bloated later.

The code for the Demo Garden is available at [this repo](https://github.com/pnettto/demo-garden) if you want to take a look. Just know the code is unstable and changing, so it might cause some minor explosions in your terminal :)

## Wrapping up

It’s often really hard to tell people what you are able to do in tech because it can be abstract or totally non-visual. But I’m hoping the Demo Garden will help bridge that gap, by collecting projects to look back to and to share with others.

And with this I think I’m ready to slow down the pace of development of the platform itself and start adding actual projects to it. It’s an exciting prospect! 