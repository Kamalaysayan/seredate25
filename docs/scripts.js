function navigateToEditor() {
    const password = prompt('Enter password:');
    if (password === 'Kamalaysayan@2025') {
        window.location.href = '/editor.html'; // Correct file path
    } else {
        alert('Incorrect password');
    }
}

function navigateToCustomer() {
    window.location.href = '/customer.html'; // Correct file path
}
