
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

                    // Set maximum and minimum dimensions
                    const maxWidth = 600; // Example maximum width
                    const maxHeight = 400; // Example maximum height
                    const minWidth = 200; // Example minimum width
                    const minHeight = 100; // Example minimum height

                    // Calculate aspect ratio
                    const aspectRatio = width / height;

                    // Adjust dimensions within constraints
                    let newWidth = width;
                    let newHeight = height;

                    if (width > maxWidth) {
                        newWidth = maxWidth;
                        newHeight = maxWidth / aspectRatio;
                    } else if (width < minWidth) {
                        newWidth = minWidth;
                        newHeight = minWidth / aspectRatio;
                    }

                    if (newHeight > maxHeight) {
                        newHeight = maxHeight;
                        newWidth = maxHeight * aspectRatio;
                    } else if (newHeight < minHeight) {
                        newHeight = minHeight;
                        newWidth = minHeight * aspectRatio;
                    }

                    // Apply new dimensions to the file upload wrapper
                    const fileUploadWrapper = document.getElementById('file-upload-wrapper');
                    fileUploadWrapper.style.width = `${newWidth}px`;
                    fileUploadWrapper.style.height = `${newHeight}px`;

                    // Show the image
                    uploadedImage.style.display = 'block';
                    uploadedImage.style.width = '100%'; // Make the image cover the adjusted box
                    uploadedImage.style.height = '100%';
                };
            };
            reader.readAsDataURL(file);
        }
    });
