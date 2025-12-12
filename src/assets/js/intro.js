(function()  {
    document.addEventListener("DOMContentLoaded", () => {
        const introBoxEl = document.getElementById("introBox");
        const introHideThisEl = document.getElementById("introHideThis");

        introHideThisEl.addEventListener('click', (e) => {
            e.preventDefault();
            introBoxEl.style = 'display: none;'
        });
        
        refreshPictures();
    });
})()