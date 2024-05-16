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

        // Notify the user that the upload is starting
        alert('Starting file upload...');

        // Dynamically construct the URL
        const baseUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
const uploadUrl = `${baseUrl}/upload-image`;

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
            // Notify the user of a successful upload
            alert('File uploaded successfully!');
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
            // Notify the user of an error
            alert('Failed to upload the file.');
        });
    });
});