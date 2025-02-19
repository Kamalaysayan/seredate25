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
