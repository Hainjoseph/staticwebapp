const imageUrls = [
    'https://staticwebstoragetest.blob.core.windows.net/container1/download-1.png',
    'https://staticwebstoragetest.blob.core.windows.net/container1/images (1).png',
    'https://staticwebstoragetest.blob.core.windows.net/container1/images (2).png',
    // Add more URLs as needed
];

let currentIndex = 0;
const container = document.getElementById('background-container');
const fileInput = document.getElementById('image-upload');
const dropZone = document.getElementById('drop-zone');
const previewContainer = document.getElementById('preview-container');
const uploadButton = document.getElementById('upload-button');
let selectedFiles = [];

// Function to change background image
function changeBackgroundImage() {
    container.style.backgroundImage = `url(${imageUrls[currentIndex]})`;
    currentIndex = (currentIndex + 1) % imageUrls.length;
}

// Function to handle file selection
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
    handleFiles(event);
});

// Function to handle the uploaded files
function handleFiles(event) {
    const files = event.target.files || event.dataTransfer.files;
    for (const file of files) {
        selectedFiles.push(file);
        addImagePreview(URL.createObjectURL(file));
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
        const index = selectedFiles.findIndex(file => URL.createObjectURL(file) === imageUrl);
        if (index > -1) {
            selectedFiles.splice(index, 1);
            previewDiv.remove();
        }
    });

    previewDiv.appendChild(removeButton);
    previewContainer.appendChild(previewDiv);
}

// Function to upload selected files
uploadButton.addEventListener('click', () => {
    selectedFiles.forEach(file => {
        const formData = new FormData();
        formData.append('image', file);

        fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            imageUrls.push(data.imageUrl);
        })
        .catch(error => console.error('Error uploading file:', error));
    });
    selectedFiles = [];
    previewContainer.innerHTML = '';
});

// Change background image every 2 seconds
setInterval(changeBackgroundImage, 2000);

// Initialize the background image
changeBackgroundImage();
