document.getElementById('file-upload-wrapper').addEventListener('click', function() {
    document.getElementById('file-upload').click();
});
document.getElementById('file-upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const uploadedImage = document.getElementById('uploaded-image');
            uploadedImage.src = e.target.result;
            uploadedImage.onload = function() {
                // Get image dimensions
                const width = this.width;
                const height = this.height;

                // Set maximum dimensions for the image
                const maxWidth = 300; // Maximum width for the image
                const maxHeight = 200; // Maximum height for the image

                // Calculate aspect ratio
                const aspectRatio = width / height;

                // Initialize new dimensions to be assigned to the image
                let newWidth = width;
                let newHeight = height;

                // Adjust width and height within the maximum dimensions
                if (width > maxWidth) {
                    newWidth = maxWidth;
                    newHeight = maxWidth / aspectRatio;
                }
                if (newHeight > maxHeight) {
                    newHeight = maxHeight;
                    newWidth = maxHeight * aspectRatio;
                }

                // Set the dimensions of the image to fit within the constraints
                uploadedImage.style.width = `${newWidth}px`;
                uploadedImage.style.height = `${newHeight}px`;

                // Optionally, adjust the white box size to fit the new image size
                // This step is optional and can be adjusted based on your specific requirements
                const centerBox = document.querySelector('.center-box');
                centerBox.style.width = `${newWidth + 40}px`; // Adding some padding
                centerBox.style.height = `${newHeight + 60}px`; // Adding some padding and space for the title or other elements

                // Show the image
                uploadedImage.style.display = 'block';
            };
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('image-upload-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Stop the form from submitting normally

    // Create FormData and append the file
    var formData = new FormData();
    var imageFile = document.querySelector('input[type="file"][name="image"]').files[0];
    formData.append('image', imageFile);

    // Make the API call to the backend
    fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
        // Note: Fetch API does not require Content-Type header for FormData
        // headers: { 'Content-Type': 'multipart/form-data' } is not needed and will actually cause an error
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Handle success response, maybe display the uploaded image or a success message
    })
    .catch((error) => {
        console.error('Error:', error);
        // Handle errors here, such as displaying an error message
    });
});