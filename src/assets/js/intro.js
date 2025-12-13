(function()  {
    if (!window.PHOTO_LIST) return;
    const photos = window.PHOTO_LIST.slice(0);

    function generateImgTag(imageDataRaw, alt = "", sizes = "300vw", classes = "") {
        const { album, images: imageData} = imageDataRaw;

        const fallbackFormat = Object.keys(imageData).find(fmt => imageData[fmt].length > 0);
        const fallbackImg = imageData[fallbackFormat][0];
        const sources = Object.entries(imageData).map(([format, variants]) => {
            const srcset = variants.map(v => v.srcset).join(", ");
            const type = variants[0].sourceType; // e.g. "image/webp"

            return `<source type="${type}" srcset="${srcset}" sizes="${sizes}">`;
        }).join("\n    ");

        window.fadeIn = function (event) {
            event.target.closest('.random-photo').classList.remove('transparent');
        }

        const imgTag = `
            <img 
            src="${fallbackImg.url}"
            width="${fallbackImg.width}"
            height="${fallbackImg.height}"
            alt="${alt}"
            class="${classes}"
            loading="lazy"
            decoding="async"
            onload="fadeIn(event)"
            >
        `.trim();

        return `
            <picture>
                ${sources}
                ${imgTag}
            </picture>
            ${album ? `<a class="legend" href="/photos/${album.slug}">${album.title}</a>` : ''}
        `.trim();
    }

    function refreshPictures() {
        const randomPhotoEls = document.querySelectorAll(".random-photo");

        randomPhotoEls.forEach((el) => {
            el.classList.add('transparent');

            setTimeout(() => {
                // Restart the list when end is reached
                if (photos.length === 0) photos.push(...window.PHOTO_LIST.slice(0))

                const randomIndex = Math.floor(Math.random() * photos.length);
                const randomImageMetadata = photos[randomIndex];
                el.innerHTML = generateImgTag(randomImageMetadata)
                photos.splice(randomIndex, 1);
            }, 500);
        })
    }
    
    document.addEventListener("DOMContentLoaded", () => {
        const randomPhotoEl = document.getElementById("randomPhotos");
        const introBoxEl = document.getElementById("introBox");
        const introHideThisEl = document.getElementById("introHideThis");
        
        randomPhotoEl.addEventListener('click', () => {
            refreshPictures();
        });

        introHideThisEl.addEventListener('click', (e) => {
            e.preventDefault();
            introBoxEl.style = 'display: none;'
        });
        
        refreshPictures();
    });
})()