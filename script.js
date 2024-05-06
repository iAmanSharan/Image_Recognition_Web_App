document.addEventListener('DOMContentLoaded', function() {
    // Listen for changes to the file input
    document.getElementById('file-upload').addEventListener('change', function(event) {
        const file = event.target.files[0]; // Get the selected file

        if (file) {
            const reader = new FileReader(); // Create a FileReader to read the file

            // Set up what happens once the file is read
            reader.onload = function(e) {
                const uploadedImage = document.getElementById('uploaded-image');
                uploadedImage.src = e.target.result; // Set the read file as the source of the img element
                uploadedImage.style.display = 'block'; // Make the image visible

                // Hide the "Click to upload image" text
                const uploadText = document.querySelector('.file-upload-wrapper span');
                if (uploadText) {
                    uploadText.style.display = 'none';
                }

                // Adjust the image dimensions to match the file-upload-wrapper
                uploadedImage.style.width = '100%';
                uploadedImage.style.height = '100%';
                uploadedImage.style.objectFit = 'contain'; // Ensure the aspect ratio is maintained without cropping
            };

            reader.readAsDataURL(file); // Read the file as a Data URL to use as the image source
        }
    });

    // Trigger the file input when the file-upload-wrapper is clicked
    document.getElementById('file-upload-wrapper').addEventListener('click', function() {
        document.getElementById('file-upload').click();
    });
});