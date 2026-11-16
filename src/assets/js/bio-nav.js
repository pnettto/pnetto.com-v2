// Bio page: the section menu only appears once you've scrolled into the
// sections, and highlights the section you're currently reading.
document.addEventListener("DOMContentLoaded", () => {
    const bar = document.querySelector(".bio .sticky-tags");
    const firstSection = document.querySelector(".bio .bio-section");
    if (!bar || !firstSection) return;

    const links = [...bar.querySelectorAll("a.badge")];
    const anchors = links
        .map((link) => document.getElementById(link.hash.slice(1)))
        .filter(Boolean);

    // Without JS the menu stays in place as a normal sticky bar (see CSS)
    bar.inert = true;

    let ticking = false;
    const update = () => {
        ticking = false;
        const offset = bar.offsetHeight + 24;

        const show = firstSection.getBoundingClientRect().top < offset;
        bar.classList.toggle("is-visible", show);
        bar.inert = !show;

        let current = -1;
        anchors.forEach((a, i) => {
            if (a.getBoundingClientRect().top <= offset) current = i;
        });
        // At the very bottom, the last section counts as current
        if (innerHeight + scrollY >= document.documentElement.scrollHeight - 2) {
            current = anchors.length - 1;
        }
        links.forEach((link, i) => {
            const active = show && i === current;
            link.classList.toggle("is-current", active);
            if (active) {
                link.setAttribute("aria-current", "location");
                // Keep the active link in view on the scrollable mobile bar
                const list = link.parentElement;
                const l = link.offsetLeft;
                if (l < list.scrollLeft || l + link.offsetWidth > list.scrollLeft + list.clientWidth) {
                    list.scrollTo({ left: l - 16, behavior: "smooth" });
                }
            } else {
                link.removeAttribute("aria-current");
            }
        });
    };

    const onScroll = () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
        }
    };

    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    update();
});
