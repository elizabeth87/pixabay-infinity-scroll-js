const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash Api
const count = 30;
const query = 'dogs';
const proxyUrl = 'https://limitless-everglades-36779.herokuapp.com/';
const apiKey = 'fZp42JmNi4fzQZ4Lp_ZSS2TsUYKvBxwp1-9S06egTKw';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=${query}`;
// Check if all images were loaded
function imageLoaded() {
  // eslint-disable-next-line no-plusplus
  imagesLoaded++;
  console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log('ready =', ready);
  }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log('total images', totalImages);
  // Run function for each object in photosArray
  photosArray.forEach(photo => {
    // Create <a> to link to Unsplash
    const item = document.createElement('a');
    // item.setAttribute('href', photo.links.html);
    // //
    // item.setAttribute('target', '_blank');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    // Create <img> for photo
    const img = document.createElement('img');
    // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('alt', photo.alt_description);
    // img.setAttribute('title', photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);
    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// // Get photos from UnsplashApi
async function getPhotos() {
  try {
    // We are going to create a constant for our response which is going to await the response from our fetch request which will fetch from our apiUrl from above
    const response = await fetch(proxyUrl + apiUrl);
    // will run through the json method and will be returned as json
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // Catch Error Here
    console.log(error);
  }
}

// // Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  )
    ready = false;
  // eslint-disable-next-line no-lone-blocks
  {
    getPhotos();
  }
});

// On Load
getPhotos();
