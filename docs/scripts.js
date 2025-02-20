function navigateToEditor() {
    const password = prompt('Enter password:');
    if (password === 'Kamalaysayan@2025') {
        window.location.href = 'editor.html'; // Correct file path
    } else {
        alert('Incorrect password');
    }
}

function navigateToCustomer() {
    window.location.href = 'customer.html'; // Correct file path
}

function downloadImage() {
    const link = document.createElement('a');
    link.href = document.getElementById('customerImage').src;
    link.download = 'customer-image.jpg';
    link.click();
}

function generateQRCode() {
    const url = window.location.href;
    const qr = new QRious({
        element: document.getElementById('qrCode'),
        value: url,
        size: 200
    });
    document.getElementById('qrCodeContainer').style.display = 'block';
}

function openAddImage() {
    document.getElementById('uploadContainer').style.display = 'flex';
}

function previewImage() {
    const imageUpload = document.getElementById('imageUpload');
    const preview = document.getElementById('preview');
    if (imageUpload.files.length > 0) {
        const file = imageUpload.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

async function doneUploading() {
    const imageUpload = document.getElementById('imageUpload');
    if (imageUpload.files.length > 0) {
        const file = imageUpload.files[0];
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        images.push({ url: result.url });
        updateBlackContainers();
        document.getElementById('uploadContainer').style.display = 'none';
    }
}

let images = [];

function updateBlackContainers() {
    const imageList = document.getElementById('imageList');
    imageList.innerHTML = ''; // Clear current containers
    images.forEach((image,