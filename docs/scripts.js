// Function to navigate to the editor page with password prompt
function navigateToEditor() {
    const password = prompt('Enter password:');
    if (password === 'Kamalaysayan@2025') {
        window.location.href = 'editor.html';
    } else {
        alert('Incorrect password');
    }
}

// Function to navigate to the customer page
function navigateToCustomer() {
    window.location.href = 'customer.html';
}

// Function to open the add image container
function openAddImage() {
    document.getElementById('whiteContainer').style.display = 'block';
}

// Function to upload an image
async function uploadImage() {
    const file = document.getElementById('fileInput').files[0];
    if (file) {
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        if (response.ok) {
            document.getElementById('uploadedImage').src = result.filePath;
            document.getElementById('uploadedImageContainer').style.display = 'block';
        } else {
            alert('Failed to upload image.');
        }
    } else {
        alert('Please select a file.');
    }
}

// Function to mark the upload process as done and navigate back to the editor page
function markAsDone() {
    window.location.href = 'editor.html';
}

// Function to fetch and display uploaded images as pink containers
async function fetchImages() {
    const response = await fetch('/images');
    const images = await response.json();
    const imageList = document.getElementById('imageList');
    
    images.forEach(image => {
        const container = document.createElement('div');
        container.className = 'pink-container';
        container.onclick = () => window.location.href = `image-page-${image.id}.html`;

        const img = document.createElement('img');
        img.src = image.url;
        img.alt = 'Uploaded Image';

        container.appendChild(img);
        imageList.appendChild(container);
    });
}

// Function to start QR code reader on customer page
function startQrCodeReader() {
    const video = document.getElementById('preview');
    const canvasElement = document.createElement('canvas');
    const canvas = canvasElement.getContext('2d');
    let scanning = false;

    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then(function(stream) {
        scanning = true;
        video.setAttribute('playsinline', true); // required to tell iOS safari we don't want fullscreen
        video.srcObject = stream;
        video.play();
        requestAnimationFrame(tick);
    });

    function tick() {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvasElement.height = video.videoHeight;
            canvasElement.width = video.videoWidth;
            canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
            const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: "dontInvert",
            });
            if (code) {
                alert(`QR Code detected: ${code.data}`);
                video.srcObject.getTracks().forEach(track => track.stop());
                scanning = false;
            }
        }
        if (scanning) {
            requestAnimationFrame(tick);
        }
    }
}

// Start fetching images on editor page load
if (window.location.pathname.endsWith('editor.html')) {
    fetchImages();
}

// Start QR code reader on customer page load
if (window.location.pathname.endsWith('customer.html')) {
    document.addEventListener('DOMContentLoaded', (event) => {
        startQrCodeReader();
    });
}
