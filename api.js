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

        const uploadUrl = 'https://5000-iamansharan-imagerecogn-ugnwd6imht4.ws-us114.gitpod.io/upload-image'

        fetch(uploadUrl, {
            method: 'POST',
            body: formData,
            mode: "cors"
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
            const uploadedImage = document.getElementById('uploaded-image');
            uploadedImage.src = `https://5000-iamansharan-imagerecogn-ugnwd6imht4.ws-us114.gitpod.io/segmented-images/${data.filename}`;
            uploadedImage.style.display = 'block';
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
            alert('Failed to upload the file.');
        });
    });
});