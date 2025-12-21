export function generateImgTag(imageDataRaw, options) {
    const { album, images: imageData } = imageDataRaw;

    const fallbackFormat = Object.keys(imageData).find((fmt) =>
        imageData[fmt].length > 0
    );
    const fallbackImg = imageData[fallbackFormat][0];
    const sources = Object.entries(imageData).map(([format, variants]) => {
        const srcset = variants.map((v) => v.srcset).join(", ");
        const type = variants[0].format; // e.g. "image/webp"
        return `<source type="image/${type}" srcset="${srcset}" sizes="${
            options?.sizes ?? "90vw"
        }">`;
    }).join("\n    ");

    const imgTag = `
            <img 
            src="${fallbackImg.url}"
            width="${fallbackImg.width}"
            height="${fallbackImg.height}"
            class="fade-in"
            loading="lazy"
            decoding="async"
            sizes="${options?.sizes ?? "90vw"}
            />
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
