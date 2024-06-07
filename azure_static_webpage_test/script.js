const AZURE_STORAGE_CONNECTION_STRING = 'DefaultEndpointsProtocol=https;AccountName=staticwebstoragetest;AccountKey=GNVPBU7NFjP26YCa04lVRIyCuWDYJHyEJBMPdj7hvaWTgCWcpP70CDI64edfnhqbCWkswDmIzPkN+AStUiNYig==;EndpointSuffix=core.windows.net'
const uploadInput = document.getElementById('imageUpload');
const backgroundImage = document.getElementById('background-image');
const blobServiceClient = AzureStorage.BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

uploadInput.addEventListener('change', async (e) => {
  const files = e.target.files;
  const containerName = "container1"; // Replace with your container name

  const containerClient = blobServiceClient.getContainerClient(containerName);
  await containerClient.createIfNotExists();

  for (const file of files) {
    const blockBlobClient = containerClient.getBlockBlobClient(file.name);
    const uploadResponse = await blockBlobClient.uploadData(file);
    console.log(`Image uploaded successfully: ${uploadResponse.url}`);

    // Update background image (assuming first uploaded image)
    backgroundImage.style.backgroundImage = `url(${uploadResponse.url})`;
    backgroundImage.style.display = 'block';
  }

  const uploadInput = document.getElementById('imageUpload');
const backgroundImage = document.getElementById('background-image');
const blobServiceClient = AzureStorage.BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const slideInterval = 5000; // Change this value to adjust slide duration (in milliseconds)

let uploadedImages = []; // Array to store uploaded image URLs

uploadInput.addEventListener('change', async (e) => {
  const files = e.target.files;

  const containerClient = blobServiceClient.getContainerClient(containerName);
  await containerClient.createIfNotExists();

  for (const file of files) {
    const blockBlobClient = containerClient.getBlockBlobClient(file.name);
    const uploadResponse = await blockBlobClient.uploadData(file);
    console.log(`Image uploaded successfully: ${uploadResponse.url}`);
    uploadedImages.push(uploadResponse.url); // Add uploaded image URL to the array
  }

  // Start the slideshow after all images are uploaded
  if (uploadedImages.length > 0) {
    let currentSlideIndex = 0;
    const slideshowInterval = setInterval(() => {
      backgroundImage.style.backgroundImage = `url(${uploadedImages[currentSlideIndex]})`;
      currentSlideIndex = (currentSlideIndex + 1) % uploadedImages.length; // Loop through images
    }, slideInterval);
  }
});

  // Implement slideshow logic here (e.g., using setInterval to change background image)
});
