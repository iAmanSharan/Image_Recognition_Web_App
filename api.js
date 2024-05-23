document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.querySelector('button[type="submit"]');
    const fileInput = document.getElementById('file-upload');

    submitButton.addEventListener('click', function(event) {
        event.preventDefault();

        const file = fileInput.files[0];
        if (!file) {
            alert('Please select a file before submitting.');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        alert('Starting file upload...');

        const uploadUrl = 'http://127.0.0.1:5000/upload-image'

        fetch(uploadUrl, {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            alert('File uploaded successfully!');
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
            alert('Failed to upload the file.');
        });
    });
});