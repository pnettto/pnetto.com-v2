// Check for saved theme preference, otherwise use system preference
const getPreferredTheme = () => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        return storedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

// Apply the theme to the document
const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
};

// Initialize theme
const initTheme = () => {
    const theme = getPreferredTheme();
    setTheme(theme);
    
    // Update toggle state if it exists
    const toggle = document.querySelector('#theme-toggle');
    if (toggle) {
        toggle.checked = theme === 'light';
    }
};

// Run initialization immediately to prevent FOUC
initTheme();

// Handle toggle click (to be attached after DOM load)
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('#theme-toggle');
    if (toggle) {
        toggle.addEventListener('change', (e) => {
            const theme = e.target.checked ? 'light' : 'dark';
            setTheme(theme);
        });
        
        // Sync toggle state one more time just in case
        toggle.checked = getPreferredTheme() === 'light';
    }
});
