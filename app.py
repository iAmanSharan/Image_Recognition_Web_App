from flask import Flask, request, jsonify
import os
from flask_cors import CORS
from image_segmentation import process_image  

app = Flask(__name__)
CORS(app)

# Configure the upload folder and allowed extensions
UPLOAD_FOLDER = 'uploads'
SEGMENTED_FOLDER = 'segmented'  # Folder to store segmented images
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SEGMENTED_FOLDER'] = SEGMENTED_FOLDER

# Function to check file extension
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload-image', methods=['POST'])
def upload_image():
    # Check if the post request has the file part
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['image']
    # If the user does not select a file, the browser submits an
    # empty file without a filename.
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = file.filename
        # Save the file to the server
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # Perform image segmentation
        output_filename = 'segmented_' + filename
        output_path = os.path.join(app.config['SEGMENTED_FOLDER'], output_filename)
        process_image(file_path, output_path)  # Call the segmentation function

        # Return the path or URL of the segmented image
        return jsonify({'message': 'File uploaded and segmented successfully', 'filename': output_filename}), 200
    else:
        return jsonify({'error': 'File type not allowed'}), 400

if __name__ == '__main__':
    # Create the upload and segmented folders if they don't exist
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    os.makedirs(SEGMENTED_FOLDER, exist_ok=True)
    app.run(debug=True)