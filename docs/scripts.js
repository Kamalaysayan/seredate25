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
    document.getElementById('fileInput').addEventListener('change', handleFileSelect);
}

async function handleFileSelect(event) {
    const file = event.target.files[0];
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
            canvasElement.width = video