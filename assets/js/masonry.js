function initMasonry(classSelector, breakpoints) {
    const masonry = document.querySelector(classSelector);

    const render = () => {
        // Flatten items from existing columns
        const items = [];
        Array.from(masonry.children).forEach((child) => {
            if (child.classList.contains("masonry-column")) {
                items.push(...Array.from(child.children));
            } else {
                items.push(child);
            }
        });

        // Prevent container collapse
        const currentHeight = masonry.offsetHeight;
        if (currentHeight > 0) masonry.style.minHeight = currentHeight + "px";

        // Clear masonry container
        masonry.innerHTML = "";

        // Determine current number of columns
        const screenWidth = window.innerWidth;
        const currentBreakpoint = breakpoints.find((bp) =>
            screenWidth >= bp.width
        );
        const columnsCount = currentBreakpoint.columns;

        // Create columns
        const columns = [];
        for (let i = 0; i < columnsCount; i++) {
            const col = document.createElement("div");
            col.className = "masonry-column";
            col.style = "display: flex;flex-direction: column;flex: 1;";
            masonry.appendChild(col);
            columns.push(col);
        }

        // Function to get column with smallest height
        const getShortestColumn = () => {
            let shortest = columns[0];
            let minHeight = shortest.offsetHeight;
            columns.forEach((col) => {
                if (col.offsetHeight < minHeight) {
                    shortest = col;
                    minHeight = col.offsetHeight;
                }
            });
            return shortest;
        };

        // Sequentially append items to the shortest column
        (function appendNext(index) {
            if (index >= items.length) return;

            const item = items[index];
            const targetColumn = getShortestColumn();
            targetColumn.appendChild(item);

            appendNext(index + 1);
        })(0);

        // Reset min-height after a brief delay to allow layout to settle
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                masonry.style.minHeight = "";
            });
        });
    };

    let resizeTimeout;
    const debouncedRender = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            render();
        }, 500);
    };

    window.addEventListener("load", render);
    window.addEventListener("resize", debouncedRender);

    render();
}
