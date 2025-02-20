async function navigateToEditor() {
    // ... (Your existing password check)
}

function navigateToCustomer() {
    // ... (Your existing code)
}

function openAddImage() {
    document.getElementById('whiteContainer').style.display = 'block';
    document.getElementById('fileInput').addEventListener('change', handleFileSelect);
}

async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            document.getElementById('uploadedImage').src = e.target.result;
            document.getElementById('uploadedImageContainer').style.display = 'block';
        }

        reader.readAsDataURL(file); // Display image preview immediately
    }
}

async function markAsDone() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if(file){
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            document.getElementById('whiteContainer').style.display = 'none'; //hide the upload container again
            document.getElementById('uploadedImageContainer').style.display = 'none'; //hide the image preview
            document.getElementById('fileInput').value = ''; //clear the input
            fetchImages(); // Refresh image list
        } else {
            alert('Failed to upload image.');
        }
    } else {
        alert('Please select an image first.');
    }
}

async function fetchImages() {
    const response = await fetch('/images');
    const images = await response.json();
    const imageList = document.getElementById('imageList');
    imageList.innerHTML = ''; // Clear existing images

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

        imageList.appendChild(container);
    });

    // imageList.insertBefore(document.getElementById('addImageContainer'), imageList.firstChild);
}

async function deleteImage(imageId) {
    await fetch(`/delete-image/${imageId}`, { method: 'DELETE' });
}

function startQrCodeReader() {
    // ... (Your existing QR code reader code)
}

if (window.location.pathname.endsWith('editor.html')) {
    fetchImages(); // Call fetchImages when editor.html loads
}

if (window.location.pathname.endsWith('customer.html')) {
    // ... (Your existing code)
}