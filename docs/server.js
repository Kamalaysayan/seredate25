const express = require('express');
const path = require('path');
const multer = require('multer');
const QRCode = require('qrcode');
const fs = require('fs');

const app = express();
const port = 3000;

// Placeholder for images (in-memory array for simplicity)
let images = [];

// Configure Multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'docs/uploads'); // Ensure this path is correct
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename using timestamp
    }
});
const upload = multer({ storage: storage });

// Serve static files from the docs directory
app.use(express.static(path.join(__dirname, 'docs')));
app.use('/uploads', express.static(path.join(__dirname, 'docs/uploads'))); // Serve uploaded images

// API endpoint for handling image upload
app.post('/upload', upload.single('image'), (req, res) => {
    const imageId = Date.now();
    const imageUrl = `/uploads/${req.file.filename}`;
    images.push({ id: imageId, url: imageUrl });

    // Create a new HTML file for the uploaded image
    const imagePageContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Image Page - KAMALAYSAYAN</title>
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
            <div class="container">
                <h1>KAMALAYSAYAN</h1>
                <div class="image-container">
                    <img src="${imageUrl}" alt="Customer Image" id="customerImage" width="500">
                </div>
                <button class="qr-button" onclick="generateQRCode()">Generate QR Code</button>
                <div id="qrCodeContainer" style="display: none;">
                    <canvas id="qrCode"></canvas>
                </div>
            </div>

            <script src="https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js"></script>
            <script>
                function generateQRCode() {
                    const url = window.location.href;
                    const qr = new QRious({
                        element: document.getElementById('qrCode'),
                        value: url,
                        size: 200
                    });
                    document.getElementById('qrCodeContainer').style.display = 'block';
                }
            </script>
        </body>
        </html>
    `;

