const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

// Unsplash API
let count = 3;
const apiKey = 's1VXZfiwhEDwxd82x945wFG5VJ3hWcKTje_VrYWV2gQ';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        initialLoad = false
        count = 7
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    }
}

// Helper Function to Set Atributes on Dom Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elemenets For Links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img>for photo
        const img = document.getElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.title_description,
        });
        // Event Listenner, check when each is finished loading
        img.addEventListener('load',)
        // Put <img> inside <a>, then put both inside imageContainer ELement
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // Catch Error Heres
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll',() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        getPhotos();
    }
});

// On load
getPhotos();