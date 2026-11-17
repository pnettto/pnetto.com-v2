// Work page: filter project cards by category tag.
// The active filter is kept in the URL hash (e.g. /work/#pet-projects).
document.addEventListener("DOMContentLoaded", () => {
    const buttons = [...document.querySelectorAll(".work-filter [data-filter]")];
    const cards = [...document.querySelectorAll(".work-container .project-card")];
    if (!buttons.length) return;

    const valid = new Set(buttons.map((b) => b.dataset.filter));
    const grid = document.querySelector(".work-container .project-grid");
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const OUT_MS = 260; // keep in sync with the .project-grid transition in pages.css
    const MAX_STAGGER = 8; // cards after this enter together
    let current = null;
    let timer = null;

    const render = (filter) => {
        cards.forEach((card) => {
            const cats = (card.dataset.categories || "").split(" ");
            card.hidden = filter !== "all" && !cats.includes(filter);
        });
    };

    // Fade the grid out, swap the cards, fade it back in
    const apply = (filter, animate = true) => {
        if (!valid.has(filter)) filter = "all";
        if (filter === current) return;
        current = filter;

        buttons.forEach((b) => {
            const active = b.dataset.filter === filter;
            b.classList.toggle("is-current", active);
            b.setAttribute("aria-pressed", String(active));
        });

        if (!animate || !grid || reduceMotion.matches) {
            render(filter);
            return;
        }

        clearTimeout(timer);
        grid.classList.add("is-switching");
        timer = setTimeout(() => {
            render(filter);

            // Restart the entry animation on the cards now visible
            let i = 0;
            cards.forEach((card) => {
                card.classList.remove("is-entering");
                if (card.hidden) return;
                card.style.setProperty("--i", Math.min(i++, MAX_STAGGER));
            });
            void grid.offsetWidth; // reflow so the animation replays
            cards.forEach((card) => {
                if (!card.hidden) card.classList.add("is-entering");
            });

            // Grid is back to full opacity instantly; the cards do the fading
            grid.style.transition = "none";
            grid.classList.remove("is-switching");
            void grid.offsetWidth;
            grid.style.transition = "";
        }, OUT_MS);
    };

    buttons.forEach((b) =>
        b.addEventListener("click", () => {
            const filter = b.dataset.filter;
            history.replaceState(null, "", filter === "all" ? location.pathname : `#${filter}`);
            apply(filter);
        })
    );

    window.addEventListener("hashchange", () => apply(location.hash.slice(1)));
    apply(location.hash.slice(1), false);
});
