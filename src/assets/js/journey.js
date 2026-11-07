// Tabs for the "Along the way" section on the Bio page
document.addEventListener("DOMContentLoaded", () => {
    const tabs = [...document.querySelectorAll(".journey-stop")];
    if (!tabs.length) return;

    const select = (tab) => {
        tabs.forEach((t) => {
            const selected = t === tab;
            t.setAttribute("aria-selected", selected);
            t.tabIndex = selected ? 0 : -1;
            document.getElementById(t.getAttribute("aria-controls")).hidden =
                !selected;
        });
    };

    tabs.forEach((tab, i) => {
        tab.addEventListener("click", () => select(tab));
        tab.addEventListener("keydown", (e) => {
            const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
            if (!step) return;
            const next = tabs[(i + step + tabs.length) % tabs.length];
            select(next);
            next.focus();
        });
    });
});
