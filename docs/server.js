const express = require('express');
const path = require('path');
const multer = require('multer');
<<<<<<< HEAD
const QRCode = require('qrcode');
const fs = require('fs');
const app = express();
const port = 3000;

// Placeholder for images (in-memory array for simplicity)
let images = [];

// Configure Multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'docs/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
=======
const fs = require('fs');

const app = express();
const port = 3000;

// Configure Multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'docs/uploads'); // Images will be saved in 'docs/uploads'
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp for filename
>>>>>>> ef0908057bbde8631d2abd6f1eb2529a68706acb
    }
});
const upload = multer({ storage: storage });

<<<<<<< HEAD
// Serve static files from the docs directory
app.use(express.static(path.join(__dirname, 'docs')));

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

    // Save the new HTML file
    fs.writeFileSync(`docs/image-page-${imageId}.html`, imagePageContent);

    res.send({ message: 'Image uploaded successfully!', filePath: imageUrl });
});

// API endpoint for fetching images
app.get('/images', (req, res) => {
    res.json(images);
});

// API endpoint for generating QR code
app.get('/generate-qr', (req, res) => {
    const url = req.query.url;
    QRCode.toDataURL(url, (err, qrUrl) => {
        if (err) {
            res.status(500).send('Error generating QR code');
        } else {
            res.send({ qrUrl: qrUrl });
        }
=======
app.use(express.static(path.join(__dirname, 'docs'))); // Serve static files from 'docs'
app.use(express.json()); // To parse JSON request bodies (important!)

// Handle image uploads
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No image file provided' });
    }

    const imageId = Date.now();
    const imageUrl = `/uploads/${req.file.filename}`; // URL for the image
    const filePath = req.file.path; // Path to the uploaded image

    // Optional: Create an HTML page for each image (you can remove this if you don't need it)
    const imagePageContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Image Page</title>
        </head>
        <body>
            <img src="${imageUrl}" alt="Uploaded Image">
        </body>
        </html>
    `;
    fs.writeFileSync(`docs/image-page-${imageId}.html`, imagePageContent);


    res.json({ message: 'Image uploaded successfully!', filePath: imageUrl, imageId: imageId });
});

// Route to get image data (for the pink containers on the editor page)
app.get('/images', (req, res) => {
    const uploadsDir = path.join(__dirname, 'docs', 'uploads');

    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            console.error("Error reading uploads directory:", err);
            return res.status(500).json({ error: "Failed to read images" });
        }

        const images = files.map(file => {
            const id = file.split('.')[0]; // Extract the ID from the filename
            const url = `/uploads/${file}`;
            return { id, url };
        });

        res.json(images);
    });
});

app.delete('/delete-image/:id', (req, res) => {
    const imageId = req.params.id;
    const uploadsDir = path.join(__dirname, 'docs', 'uploads');

    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            console.error("Error reading uploads directory:", err);
            return res.status(500).json({ error: "Failed to read images" });
        }

        const fileToDelete = files.find(file => file.startsWith(imageId));
        if (!fileToDelete) {
            return res.status(404).json({ error: "Image not found" });
        }

        fs.unlink(path.join(uploadsDir, fileToDelete), (err) => {
            if (err) {
                console.error("Error deleting image:", err);
                return res.status(500).json({ error: "Failed to delete image" });
            }
            res.json({ message: "Image deleted successfully" });
        });
>>>>>>> ef0908057bbde8631d2abd6f1eb2529a68706acb
    });
});

app.listen(port, () => {
<<<<<<< HEAD
    console.log(`Server running at http://localhost:${port}`);
});
=======
    console.log(`Server is running on port ${port}`);
});
>>>>>>> ef0908057bbde8631d2abd6f1eb2529a68706acb
