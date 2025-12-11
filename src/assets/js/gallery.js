document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    const galleryItems = document.querySelectorAll('.gallery-item img, .work-image img');
    
    let currentIndex = 0;
    const images = Array.from(galleryItems).map(img => {
        const button = img.closest('.gallery-item') || img.closest('.work-image');
        return {
            src: button.dataset.fullSrc || img.src,
            id: button.id
        };
    });

    function updateHash(index) {
        if (images[index] && images[index].id) {
            const shortId = images[index].id.split('-')[1];
            history.replaceState(null, null, '#' + shortId);
        }
    }

    function clearHash() {
        history.replaceState(null, null, ' ');
    }

    function openLightbox(index) {
        if (index < 0 || index >= images.length) return;
        currentIndex = index;
        lightboxImg.src = images[currentIndex].src;
        lightbox.setAttribute('aria-hidden', 'false');
        lightbox.classList.add('visible');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        updateHash(index);
    }

    function closeLightbox() {
        lightbox.setAttribute('aria-hidden', 'true');
        lightbox.classList.remove('visible');
        document.body.style.overflow = '';
        clearHash();
    }

    function showNext() {
        lightboxImg.classList.add('fade-out');
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % images.length;
            lightboxImg.src = images[currentIndex].src;
            updateHash(currentIndex);
            lightboxImg.onload = () => {
                lightboxImg.classList.remove('fade-out');
            };
        }, 200);
    }

    function showPrev() {
        lightboxImg.classList.add('fade-out');
        setTimeout(() => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            lightboxImg.src = images[currentIndex].src;
            updateHash(currentIndex);
            lightboxImg.onload = () => {
                lightboxImg.classList.remove('fade-out');
            };
        }, 200);
    }

    // Event Listeners
    galleryItems.forEach((img, index) => {
        img.closest('button').addEventListener('click', () => openLightbox(index));
    });

    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });

    // Close on clicking outside image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.getAttribute('aria-hidden') === 'true') return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });

    // Swipe Support
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) showNext();
        if (touchEndX > touchStartX + 50) showPrev();
    }

    // Check for hash on load
    const hash = window.location.hash;
    if (hash) {
        const id = hash.substring(1); // Remove '#'
        const longId = `image-${id}-jpg`;
        const index = images.findIndex(img => img.id === longId);
        if (index !== -1) {
            openLightbox(index);
        }
    }
});
