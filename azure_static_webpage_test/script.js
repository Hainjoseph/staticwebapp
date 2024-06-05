const images = [
    'https://www.itrobes.com/wp-content/uploads/2021/08/What-is-a-static-website.jpg',
    'https://th.bing.com/th/id/OIP.6iXbQaH6O0n23xy865OLLAHaD5?w=950&h=500&rs=1&pid=ImgDetMain',
    'https://th.bing.com/th/id/OIP.6iXbQaH6O0n23xy865OLLAHaD5?w=950&h=500&rs=1&pid=ImgDetMain'
];

let currentIndex = 0;

function changeBackgroundImage() {
    document.body.style.backgroundImage = `url(${images[currentIndex]})`;
    currentIndex = (currentIndex + 1) % images.length;
}

setInterval(changeBackgroundImage, 2000);

// Initial call to set the first image
changeBackgroundImage();
