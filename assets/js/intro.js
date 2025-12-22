import { generateImgTag } from "./utils/generateImgTag.js";

(function () {
    if (!window.PHOTO_LIST) return;
    const photos = window.PHOTO_LIST.slice(0);
    function refreshPictures() {
        const randomPhotoEls = document.querySelectorAll(".random-photo");

        randomPhotoEls.forEach((el, index) => {
            setTimeout(() => {
                // Restart the list when end is reached
                if (photos.length === 0) {
                    photos.push(...window.PHOTO_LIST.slice(0));
                }

                const randomIndex = Math.floor(Math.random() * photos.length);
                const randomImageMetadata = photos[randomIndex];

                const imageTag = generateImgTag(randomImageMetadata, {
                    sizes: index === 3 ? "100vw" : "50vw",
                });
                const legendTag = randomImageMetadata.album
                    ? `<div class="fade-in"><a class="legend" href="/photos/${randomImageMetadata.album.slug}">${randomImageMetadata.album.title}</a></div>`
                    : "";
                el.innerHTML = `${imageTag}${legendTag}`;

                // Remove photo from list
                photos.splice(randomIndex, 1);
            }, 500);
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        const randomPhotoEls = document.querySelectorAll(
            ".random-photo",
        );
        randomPhotoEls.forEach((el) => {
            el.addEventListener("click", () => {
                const fadeIns = el.closest(".random-photos").querySelectorAll(
                    ".random-photo .fade-in",
                );
                fadeIns.forEach((fd) => {
                    fd.classList.remove("is-loaded");
                });
                refreshPictures();
            });
        });
    });
})();
