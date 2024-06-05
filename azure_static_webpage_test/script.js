const containerUrl = 'https://<your_storage_account>.blob.core.windows.net/background-images/';

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
changeBackgroundImage();
