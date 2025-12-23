import { generateImgTag } from "./utils/generateImgTag.js";

document.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.getElementById("lightbox");
    const lightboxContent = document.getElementById("lightbox-content");
    const closeBtn = document.querySelector(".lightbox-close");
    const prevBtn = document.querySelector(".lightbox-prev");
    const nextBtn = document.querySelector(".lightbox-next");
    const galleryItems = document.querySelectorAll(
        ".gallery-item img, .work-image img",
    );

    let currentIndex = 0;
    const images = Array.from(galleryItems).map((img) => {
        const button = img.closest(".gallery-item") ||
            img.closest(".work-image");
        return {
            src: button.dataset.fullSrc || img.src,
            id: button.id,
            metadata: button.dataset.imageMetadata
                ? JSON.parse(button.dataset.imageMetadata)
                : null,
        };
    });

    function updateHash(index) {
        if (images[index] && images[index].id) {
            const shortId = images[index].id;
            history.replaceState(null, null, "#" + shortId);
        }
    }

    function clearHash() {
        history.replaceState(null, null, " ");
    }

    function updateLightboxImage(index) {
        const photo = images[index];

        if (photo.metadata) {
            lightboxContent.innerHTML = generateImgTag(photo.metadata, {
                objectFit: "contain",
            });
            const img = lightboxContent.querySelector("img");
            img.classList.add("fade-out");
            img.onload = () => {
                img.classList.add("is-loaded");
                img.classList.remove("fade-out");
            };
        } else {
            lightboxContent.innerHTML =
                `<img id="lightbox-img" src="${photo.src}" alt="">`;
            const img = lightboxContent.querySelector("img");
            img.onload = () => {
                img.classList.add("is-loaded");
            };
        }
    }

    function openLightbox(index) {
        if (index < 0 || index >= images.length) return;
        currentIndex = index;
        updateLightboxImage(currentIndex);
        lightbox.setAttribute("aria-hidden", "false");
        lightbox.classList.add("visible");
        document.body.style.overflow = "hidden"; // Prevent scrolling
        updateHash(index);
    }

    function closeLightbox() {
        lightbox.setAttribute("aria-hidden", "true");
        lightbox.classList.remove("visible");
        document.body.style.overflow = "";
        clearHash();
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        updateLightboxImage(currentIndex);
        updateHash(currentIndex);
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightboxImage(currentIndex);
        updateHash(currentIndex);
    }

    // Event Listeners
    galleryItems.forEach((img, index) => {
        img.closest("button").addEventListener(
            "click",
            () => openLightbox(index),
        );
    });

    closeBtn.addEventListener("click", closeLightbox);
    nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        showNext();
    });
    prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        showPrev();
    });

    // Close on clicking outside image
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard Navigation
    document.addEventListener("keydown", (e) => {
        if (lightbox.getAttribute("aria-hidden") === "true") return;

        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") showNext();
        if (e.key === "ArrowLeft") showPrev();
    });

    lightbox.addEventListener("touchstart", (e) => {
        console.log(`e.target.nodeName`, e.target.nodeName);
        if (e.touches[0].clientX > (document.body.clientWidth / 2)) {
            showNext();
        } else {
            showPrev();
        }
    });

    // Check for hash on load
    const hash = window.location.hash;
    if (hash) {
        const id = hash.substring(1); // Remove '#'
        const index = images.findIndex((img) => img.id.startsWith(id));
        if (index !== -1) {
            openLightbox(index);
        }
    }
});
