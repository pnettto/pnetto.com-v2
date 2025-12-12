(function () {
    function generateImgTag(imageDataRaw, alt = "", sizes = "300vw", classes = "") {
        const { album, ...imageData} = imageDataRaw;

        const fallbackFormat = Object.keys(imageData).find(fmt => imageData[fmt].length > 0);
        const fallbackImg = imageData[fallbackFormat][0];
        const sources = Object.entries(imageData).map(([format, variants]) => {
            const srcset = variants.map(v => v.srcset).join(", ");
            const type = variants[0].sourceType; // e.g. "image/webp"

            return `<source type="${type}" srcset="${srcset}" sizes="${sizes}">`;
        }).join("\n    ");

        const imgTag = `
            <img 
            src="${fallbackImg.url}"
            width="${fallbackImg.width}"
            height="${fallbackImg.height}"
            alt="${alt}"
            class="${classes}"
            loading="lazy"
            decoding="async"
            >
        `.trim();

        return `
            <picture>
                ${sources}
                ${imgTag}
            </picture>
            ${album ? `<a href="/photos/${album.slug}">${album.title}</a>` : ''}
        `.trim();
    }
    
    document.addEventListener("DOMContentLoaded", () => {
        if (!window.PHOTO_LIST) return;
        const photos = window.PHOTO_LIST;
        const randomPhotoEl = document.getElementById("randomPhoto");
        
        randomPhotoEl.addEventListener('click', () => {
            const randomImageMetadata = photos[Math.floor(Math.random() * photos.length)];
            randomPhotoEl.innerHTML = generateImgTag(randomImageMetadata)
        });
        
        const randomImageMetadata = photos[Math.floor(Math.random() * photos.length)];
        randomPhotoEl.innerHTML = generateImgTag(randomImageMetadata)
        
        
    });
})();