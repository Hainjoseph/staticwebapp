const imageUrls = [
    'https://staticwebstoragetest.blob.core.windows.net/container1/168311249_2941386.jpg',
    'https://staticwebstoragetest.blob.core.windows.net/container1/230621042149-01-cristiano-ronaldo-euro-200-apps-062023-restricted.jpg',
    'https://staticwebstoragetest.blob.core.windows.net/container1/ap22364795346345-153c53713ce57b880428deae9fef9b9926961b6b.jpg',
    // Add more URLs as needed
];

let currentIndex = 0;
const container = document.getElementById('background-container');
const fileInput = document.getElementById('image-upload');
const dropZone = document.getElementById('drop-zone');
const previewContainer = document.getElementById('preview-container');

// Function to change background image
function changeBackgroundImage() {
    container.style.backgroundImage = `url(${imageUrls[currentIndex]})`;
    currentIndex = (currentIndex + 1) % imageUrls.length;
}

// Function to handle image uploads
fileInput.addEventListener('change', handleFiles);
dropZone.addEventListener('click', () => fileInput.click());
dropZone.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropZone.style.backgroundColor = '#e9ecef';
});
dropZone.addEventListener('dragleave', () => {
    dropZone.style.backgroundColor = '';
});
dropZone.addEventListener('drop', (event) => {
    event.preventDefault();
    dropZone.style.backgroundColor = '';
    const files = event.dataTransfer.files;
    handleFiles({ target: { files } });
});

// Function to handle the uploaded files
function handleFiles(event) {
    const files = event.target.files;
    for (const file of files) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imageUrls.push(e.target.result);
            addImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
    }
}

// Function to add image preview
function addImagePreview(imageUrl) {
    const previewDiv = document.createElement('div');
    previewDiv.className = 'preview';
    previewDiv.style.backgroundImage = `url(${imageUrl})`;

    const removeButton = document.createElement('button');
    removeButton.className = 'remove-button';
    removeButton.innerHTML = '&times;';
    removeButton.addEventListener('click', () => {
        const index = imageUrls.indexOf(imageUrl);
        if (index > -1) {
            imageUrls.splice(index, 1);
            previewDiv.remove();
        }
    });

    previewDiv.appendChild(removeButton);
    previewContainer.appendChild(previewDiv);
}

// Change background image every 2 seconds
setInterval(changeBackgroundImage, 2000);

// Initialize the background image
changeBackgroundImage();
