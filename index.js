let info1Element = document.getElementById("info1");
let info2Element = document.getElementById("info2");
let info3Element = document.getElementById("info3");
let info4Element = document.getElementById("info4");

let navigatorLanguage = navigator.language;
let screenWidth = window.screen.width;
let screenHeight = window.screen.height;
let browserHeight = outerHeight;
let browserWidth = outerWidth;
const event = new Date();
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        };

        // Muotoile päivämäärä ja aika
        const datetime = event.toLocaleDateString('fi-FI', options);

info1Element.innerHTML = "<p>Selaimen kieli: " + navigatorLanguage + "</p>";
info2Element.innerHTML = "<p>Näytön koko: " + screenWidth + " x " + screenHeight + "</p>";
info3Element.innerHTML = "<p>Selaimen ikkunan koko: " + browserWidth + " x " + browserHeight + "</p>";
info4Element.innerHTML = "<p>Päivämäärä ja aika: " + datetime + "</p>";
