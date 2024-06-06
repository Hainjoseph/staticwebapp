/* const containerUrl = 'https://staticwebstoragetest.blob.core.windows.net/container1';

const images = [
    `${containerUrl}168311249_2941386.jpg`,
    `${containerUrl}230621042149-01-cristiano-ronaldo-euro-200-apps-062023-restricted.jpg`,
    `${containerUrl}ap22364795346345-153c53713ce57b880428deae9fef9b9926961b6b.jpg`
];


let currentIndex = 0;

function changeBackgroundImage() {
    document.body.style.backgroundImage = `url(${images[currentIndex]})`;
    currentIndex = (currentIndex + 1) % images.length;
}

setInterval(changeBackgroundImage, 2000);

// Initial call to set the first image
changeBackgroundImage(); */


const imageUrls = [
    'https://staticwebstoragetest.blob.core.windows.net/container1/168311249_2941386.jpg',
    'https://staticwebstoragetest.blob.core.windows.net/container1/230621042149-01-cristiano-ronaldo-euro-200-apps-062023-restricted.jpg',
    'https://staticwebstoragetest.blob.core.windows.net/container1/ap22364795346345-153c53713ce57b880428deae9fef9b9926961b6b.jpg',
    'https://staticwebstoragetest.blob.core.windows.net/container1/WhatsApp Image 2024-06-06 at 10.46.04_749f2c1b-1.jpg'
    'https://staticwebstoragetest.blob.core.windows.net/container1/WhatsApp Image 2024-06-06 at 10.46.31_c0ee2bf4-2.jpg'
    'https://staticwebstoragetest.blob.core.windows.net/container1/WhatsApp Image 2024-06-06 at 10.48.25_019cdaec-3.jpg'
    // Add more URLs as needed
];

let currentIndex = 0;
const container = document.getElementById('background-container');

// Function to change background image
function changeBackgroundImage() {
    container.style.backgroundImage = `url(${imageUrls[currentIndex]})`;
    currentIndex = (currentIndex + 1) % imageUrls.length;
}

// Change background image every 2 seconds
setInterval(changeBackgroundImage, 2000);

// Initialize the background image
changeBackgroundImage();

