document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const item = entry.target;
                    const img = item.tagName === "IMG"
                        ? item
                        : item.querySelector("img");

                    const reveal = () => {
                        requestAnimationFrame(() => {
                            item.classList.add("is-loaded");
                        });
                    };

                    if (img && !img.complete) {
                        img.addEventListener("load", reveal, { once: true });
                    } else {
                        reveal();
                    }
                    observer.unobserve(item);
                }
            });
        },
        { threshold: 0.1, rootMargin: "50px" },
    );

    // Initial scan for elements with .fade-in class or content images
    const scanAndObserve = () => {
        const selectors = [
            ".fade-in:not(.is-loaded)",
            "img:not(.is-loaded):not(.logo-img):not(.no-fade)",
        ];

        document.querySelectorAll(selectors.join(",")).forEach((el) => {
            // If it's an image without the fade-in class, add it for the CSS transition
            if (el.tagName === "IMG" && !el.classList.contains("fade-in")) {
                el.classList.add("fade-in");
            }
            observer.observe(el);
        });
    };

    scanAndObserve();

    // Observe changes in the DOM to support dynamically added content (like masonry)
    const mutationObserver = new MutationObserver(() => {
        scanAndObserve();
    });

    mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
    });
});
