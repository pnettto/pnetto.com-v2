---
layout: layouts/post.njk
title: pnetto.com gets a facelift! 💅
date: 2025-12-28
tags:
    - code
    - career
    - lifestyle
    - 2015-12
---

In the second 2021 I was getting ready to apply for jobs in Copenhagen as my plan to leave Reykjavík after 9 years started coming closer to become a reality.

It was an exciting time, there was a lot to look forward to and I wanted my professional website to reflect who I was and what I was looking for, so that my new life, including the job, would be more aligned with my expectations.

So I set out to create a crafty design and publish a Next.js website. Next was all the rage back then and I was certainly happy to use a platform which allowed me to build static sites while exercising my React muscles. 

Picture: https://pedronetto-p980n7u1l-pedro-nettos-projects.vercel.app/

It worked well! I got several job offers, including one from Lego, but I ended up going to Icelandair, a company that taught me a whole lot. I like to think that success had something to do with how I communicated my professional skills through the website.

In the end, I think the best thing about building the site was to take the time to write down my story, and take a moment to appreciate how far I had come. It was a celebration of tech love. I realized I had become one of those fortunate people who actually love their jobs. Seeing all the case studies coming to life on my website were a great way to reflect and put a face to the memory.

But fast forward, we're in 2025 (nearly 2026, time flew), and I thought it was high time the website got a new face and new content.

I wanted to preserve the existing functionality, the portfolio, the bio, but add a section for my photos (a hobby I've been developing since 2020) and my writings. I have been wanting to write for a long time.

I actually do quite a bit of writing, only I do it for myself. I keep a journal for well over a decade, and I love how the simple act of putting word on the screen magically makes whatever you have in your head way clearer.

There's also the great benefit of preserving memory. There's always so much happening in life, things we've learned, people we meet, ideas we stumble upon. If we don't do anything about it, at the end of each week most of it will disappear in thin air.

Conversely, if we do materialize in some sort of way, they become not only more vivid in our biological memories, but they also become a database which we can then access for future use. There's this and there's also offloading the necessity of remembering. My memory is not the greatest (I think) so writing really does the trick for me.

The problem is that I haven't had a place where I enjoyed publishing. Well now that problem is over. THe new pnetto.com has a shiny and new section just for texts, which I called "Logs", to avoid the weight of having to publish an "Article" or even a "Post". The purpose of Logs is not so much to share things I know with anyone so much as to having my personal thoughts database which might come in handy to refer to in the future.

So if you're here and you're reading this, I'm very surprised indeed. You're not me, and yet you are still here, really incredible stuff.

The Photo section is also a mechanism I came up with to support my photography hobby. I thought that, if I did have a beautiful place to post photos, I would be more inclined to actually do something with all those hours go over Lightroom material :)

But alright, to the implementation.

## Implementation

Creating this new site has been a challenge as much as an opportunity. Migrating a 2020 Next.js site proved a little complicated. In the heat of the moment I ended up over-engineering the whole thing and Node version mismatches started causing explosions on my logs and I tried to build the website again on my shiny 2025 Mac with Node v9385859343875893-alpha.

Anyway, I thought it would be a good opportunity to get into the AI train and have a robot migrate the site for me, which... worked! All that boring work that is migrating versions, and method names, and new conventions and stuff, all that got solved in a rather smooth way by some LLM somewhere.

After I had a stripped down version of my old site now in the shape of a modern, simple 11ty website, it was time to get my hands dirty and start implementing all the functionality I wanted.

I had a special amount of fun with creating a new design, which is minimal and programmer-like. I always like when I see a proper programmer website, so simple, so functional, giving way to the amazing content they create.

And it's kind of misleading too! Simplicity is always misleading. It looks so easy, but the problem is that because it's so simple things can feel out of place or "off" very easily. So I did spend my fair share of time polishing the design, choosing a font and so on. It reminded me of a co-worker I had that used to scream at me when he saw me perfecting something for a long time: "stop licking this thing!". He meant it like a cat licks the fur non-stop until it's absolutely perfect.

Awyway, when that was in place and I got tired of admiring how fast a static website builds and loads, I started adding some niceness.

For example, the images are all hosted on Cloudflare's R2. I have 2GB of pictures, with all the pre-built variations (I build 3 different sizes) to prevent you, my dear visitor, from downloading huge files unnecessarily. They are all synced with a bucket I have there, and because they have no egress fees and don't charge until you have 10GB of stuff, it's free. Incredible technology hosting my photos for free, I won't complain.

Also free is the hosting on Github pages, including the build CI/CD(which takes 40s) every time I push new content. Isn't it incredible? Who's paying for this? There's definitely a fair share of processing in the build pipeline, but I guess that's nothing for them. I still can't understand this type of riches. I should really get Microsoft stocks 🤔

And here are my favorite parts of my `.eleventy.js`.

### Encryption

With this filter I can encode pages in a way they are only available after the user inputs a password I chose. It's a pretty cool way to add a security layer, although for sure not a guarantee some crazy ass hacker won't force their way through. When creating this I learned that inefficiency can be a feature! If someone were to try and crack this encryption they would take forever (or lots of money) simply because the decryption process is too slow (~100ms) 😂

{% code "encrypt", "javascript" %}
eleventyConfig.addFilter("encrypt", (content, password) => {
    if (!password) {
        console.warn(
            "No password provided for encrypted content. Content will be hidden but NOT securely encrypted.",
        );
    }

    const algorithm = "aes-256-gcm";
    const iterations = 150_000;
    const keyLength = 32; // 256 bits
    const digest = "sha256";

    // Same password for all pages
    const salt = Buffer.from(
        "803d0233f92790237d797d67a3933ccada0ad878d596b9b87998cdf5efd18746",
        "hex",
    );

    // Derive key using PBKDF2 (slow, brute-force resistant)
    const key = crypto.pbkdf2Sync(
        password,
        salt,
        iterations,
        keyLength,
        digest,
    );

    // AES-GCM IV (12 bytes recommended)
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(content, "utf8", "hex");
    encrypted += cipher.final("hex");

    const authTag = cipher.getAuthTag();

    // Everything needed for decryption (except password)
    const payload = {
        iv: iv.toString("hex"),
        tag: authTag.toString("hex"),
        data: encrypted,
        salt: salt.toString("hex"),
        iterations,
    };

    return Buffer.from(JSON.stringify(payload)).toString("base64");
});
{% endcode %}


### Code runner

In the past days I have created my own code runner, something like Judge0, but way more lightweight. I will write about it soon. But here this shortcode prepares a code runner component that allows me to showcase actually running scripts in many languages. It's like so cool. You can see an example here: [https://pnetto.com/logs/2025-12/code-runner/](https://pnetto.com/logs/2025-12/code-runner/).

{% code "codeRunner", "javascript" %}
eleventyConfig.addPairedShortcode(
    "codeRunner",
    function (content, title, languageName, isEditable = false) {
        const editableAttr = isEditable
            ? 'contenteditable="true" spellcheck="false"'
            : "";

        // Prism work
        loadLanguages([languageName.toLowerCase()]);
        const highlightedCode = Prism.highlight(
            content,
            Prism.languages[languageName.toLowerCase()] ||
                Prism.languages.plaintext,
            languageName,
        );

        // Encode newlines as HTML entities to prevent the Markdown parser from
        // breaking the HTML structure (e.g., injecting <p> tags or stripping indentation).
        // This ensures the content looks like a single line to the parser but renders correctly.
        const safeHighlightedCode = highlightedCode.replace(/\n/g, "&#10;");

        // Return compressed HTML to prevent markdown parser from misinterpreting indentation
        return `<div class="code-container code-runner" data-language-name="${languageName}">
            <label class="language-label">${languageName}</label>
            ${title !== "" ? `<div class="code-header">${title}</div>` : ""}
            <pre class="language-${languageName.toLowerCase()}"><code ${editableAttr}>${safeHighlightedCode}</code></pre>
            <button onclick="runCode(this)">Run</button>
            <div class="code-output"></div>
        </div>`;
    },
);

### Optmized image tag

This allows me to create my own optimized image tag with all sizes as source options, straight from a pre-generated JSON file that contains all the information it needs.

{% code "codeRunner", "javascript" %}
eleventyConfig.addShortcode("optmizedImageTag", (imageDataRaw, options) => {
    return generateImgTag(imageDataRaw, options);
});
{% endcode %}

### Finally

And there you have it. The website is awesome, I love it, I'm so glad I went on to renew it.

My expectations are to use it often to publish photos, learnings, work-related things, and so on.

We'll see how it pans out but I'm sure this tool is a great addition to my lifestyle and an incredible source of inspiration.