async function navigateToEditor() {
    const password = prompt('Enter password:');
    if (password === 'Kamalaysayan@2025') {
        window.location.href = 'editor.html';
    } else {
        alert('Incorrect password');
    }
}

function navigateToCustomer() {
    window.location.href = 'customer.html';
}

function openAddImage() {
    document.getElementById('whiteContainer').style.display = 'block';
}

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

function markAsDone() {
    window.location.href = 'editor.html';
}

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
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-button';
        deleteBtn.innerHTML = 'Delete';
        deleteBtn.onclick = async (event) => {
            event.stopPropagation();
            await deleteImage(image.id);
            container.remove();
        };

        container.appendChild(deleteBtn);

        imageList.insertBefore(container, document.getElementById('addImageContainer'));
    });
}

async function deleteImage(imageId) {
    await fetch(`/delete-image/${imageId}`, { method: 'DELETE' });
}

if (window.location.pathname.endsWith('editor.html')) {
    fetchImages();
}

if (window.location.pathname.endsWith('customer.html')) {
    document.addEventListener('DOMContentLoaded', (event) => {
        startQrCodeReader();
    });
}
