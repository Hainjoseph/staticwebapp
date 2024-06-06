const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { BlobServiceClient } = require('@azure/storage-blob');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Azure Blob Storage configuration
const AZURE_STORAGE_CONNECTION_STRING = 'DefaultEndpointsProtocol=https;AccountName=staticwebstoragetest;AccountKey=GNVPBU7NFjP26YCa04lVRIyCuWDYJHyEJBMPdj7hvaWTgCWcpP70CDI64edfnhqbCWkswDmIzPkN+AStUiNYig==;EndpointSuffix=core.windows.net';
const containerName = 'container1';
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(containerName);

// Endpoint to handle image uploads
app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const blobName = uuidv4() + path.extname(req.file.originalname);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        await blockBlobClient.upload(req.file.buffer, req.file.size);
        const imageUrl = blockBlobClient.url;

        res.json({ imageUrl });
    } catch (error) {
        console.error('Error uploading file to Azure Blob Storage:', error);
        res.status(500).send('Error uploading file');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

