---
eleventyExcludeFromCollections: true
permalink: false
---
# Design System

A modular, portable design system. Copy this folder to any project.

## Structure

```
design-system/
├── css/
│   ├── index.css          # Entry point (imports all)
│   ├── tokens.css         # Variables: colors, spacing, typography
│   ├── base.css           # Reset & element defaults
│   ├── utilities.css      # Helper classes
│   ├── pages.css          # Page-specific layouts
│   └── components/
│       ├── nav.css        # Header, navigation, burger menu
│       ├── toggle.css     # Theme toggle switch
│       ├── badge.css      # Tags/badges
│       ├── card.css       # Project/album cards
│       ├── lightbox.css   # Modal image viewer
│       ├── gallery.css    # Photo gallery/masonry
│       ├── carousel.css   # Horizontal scroll carousel
│       ├── timeline.css   # Vertical timeline
│       ├── code.css       # Code blocks + Prism syntax highlighting
│       ├── video.css      # Video player (Plyr)
│       └── lists.css      # Post lists, menus
├── js/
│   ├── ui.js              # Theme toggle, burger menu, carousel
│   ├── effects.js         # Fade-in animations
│   ├── gallery.js         # Lightbox with optimized images
│   ├── masonry.js         # Dynamic column layout
│   ├── code-runner.js     # Execute code snippets
│   └── video.js           # Plyr video player init
└── showcase.njk           # Live component demo page
```

## Usage

```html
<!-- CSS (includes Prism syntax highlighting) -->
<link rel="stylesheet" href="/design-system/css/index.css">

<!-- Core JS -->
<script src="/design-system/js/ui.js"></script>
<script src="/design-system/js/effects.js"></script>

<!-- Optional: Code Runner -->
<script src="/design-system/js/code-runner.js"></script>

<!-- Optional: Video (requires Plyr CDN) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/plyr@3/dist/plyr.css">
<script src="https://cdn.jsdelivr.net/npm/plyr@3/dist/plyr.polyfilled.js"></script>
<script src="/design-system/js/video.js"></script>

<!-- Optional: Gallery (ES module) -->
<script type="module" src="/design-system/js/gallery.js"></script>
```

## Features

- **Tokens**: Colors, fonts, spacing (customizable)
- **Components**: Nav, cards, badges, lightbox, carousel, timeline
- **Prism**: Syntax highlighting for code blocks (Tomorrow Night theme)
- **Code Runner**: Execute code snippets via API
- **Video**: Plyr integration with design token theming

## Customization

Edit `tokens.css` to change colors, fonts, spacing, and breakpoints.

## Showcase

Visit `/design-system/showcase/` to see all components in action.
