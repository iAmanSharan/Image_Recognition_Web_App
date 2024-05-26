document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.querySelector('button[type="submit"]');
    const fileInput = document.getElementById('file-upload');
    const segmentedImage = document.getElementById('segmented-image');

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

        const uploadUrl = 'https://fictional-eureka-4p96xw57x45hvrj-5000.app.github.dev/upload-image'

        fetch(uploadUrl, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data.filename);
            alert('File uploaded successfully!');
            segmentedImage.src = data.segmentedImageUrl;
            segmentedImage.style.display = 'block';
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
            alert('Failed to upload the file.');
        });
    });
});