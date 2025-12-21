(function () {
    if (!window.PHOTO_LIST) return;
    const photos = window.PHOTO_LIST.slice(0);

    function generateImgTag(imageDataRaw, { sizes }) {
        const { album, images: imageData } = imageDataRaw;

        const fallbackFormat = Object.keys(imageData).find((fmt) =>
            imageData[fmt].length > 0
        );
        const fallbackImg = imageData[fallbackFormat][0];
        const sources = Object.entries(imageData).map(([format, variants]) => {
            const srcset = variants.map((v) => v.srcset).join(", ");
            const type = variants[0].format; // e.g. "image/webp"
            return `<source type="image/${type}" srcset="${srcset}" sizes="(min-width: 1000px) ${sizes}, 100vw">`;
        }).join("\n    ");

        const imgTag = `
            <img 
            src="${fallbackImg.url}"
            width="${fallbackImg.width}"
            height="${fallbackImg.height}"
            class="fade-in"
            loading="lazy"
            decoding="async"
            >
        `.trim();

        return `
            <div style="width: 100%; background-color: var(--bg-secondary); ">
                <picture>
                    ${sources}
                    ${imgTag}
                </picture>
            </div>
            ${
            album
                ? `<div class="fade-in"><a class="legend" href="/photos/${album.slug}">${album.title}</a></div>`
                : ""
        }
        `.trim();
    }

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
                el.innerHTML = generateImgTag(randomImageMetadata, {
                    sizes: index === 3 ? "100vw" : "50vw",
                });
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
