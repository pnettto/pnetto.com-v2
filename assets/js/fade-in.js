const goAwayListener = (e) => {
    const link = e.target.closest("a");
    if (!link) return;

    e.preventDefault();

    const container = document.querySelector(
        ".container.fade-in.is-loaded",
    );
    container.classList.add("go-away");

    setTimeout(() => {
        window.location.href = link.href;
    }, 200);
};

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", goAwayListener);

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const el = entry.target;
                const reveal = () => el.classList.add("is-loaded");

                if (el.tagName === "IMG" && !el.complete) {
                    el.addEventListener("load", reveal);
                    el.addEventListener("error", reveal);
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
