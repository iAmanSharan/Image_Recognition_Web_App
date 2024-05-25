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

        const uploadUrl = 'https://symmetrical-space-winner-57p5wxjgqx437wr4-5000.app.github.dev/upload-image'

        fetch(uploadUrl, {
            method: 'POST',
            body: formData,
            mode: "no-cors",
            headers: {
                'Accept': 'application/json',
                // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Uncomment if auth is needed
            },
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