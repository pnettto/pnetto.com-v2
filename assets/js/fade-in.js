document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.querySelector(".container").classList.add("is-loaded");
    }, 200);

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const el = entry.target;
                const reveal = () => el.classList.add("is-loaded");

                if (el.tagName === "IMG") {
                    // Make sure the image is loaded before revealing
                    el.decode().then(reveal).catch(reveal);
                } else {
                    reveal();
                }

                observer.unobserve(el);
            });
        },
        {
            threshold: 0,
            rootMargin: "100px",
        },
    );

    const scanAndObserve = () => {
        const elements = document.querySelectorAll(".fade-in:not(.is-loaded)");
        elements.forEach((el) => observer.observe(el));
    };

    // Initial scan
    scanAndObserve();

    // Re-scan when content changes (e.g. masonry, dynamic loading)
    const mutationObserver = new MutationObserver(() => {
        scanAndObserve();
    });

    mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
    });

    // Fallback: scan on window load to catch everything else
    window.addEventListener("load", scanAndObserve);
});
