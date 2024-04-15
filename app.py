from flask import Flask, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
import os
from image_segmentation import segment_image

app = Flask(__name__)

# Configure the upload and segmented images folder
UPLOAD_FOLDER = 'uploads'
SEGMENTED_FOLDER = 'segmented_images'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SEGMENTED_FOLDER'] = SEGMENTED_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(save_path)
        
        # After saving, call the segmentation function
        segmented_image_path = segment_image(save_path)
        
        # Assuming segment_image returns a path relative to SEGMENTED_FOLDER
        # Extract the filename of the segmented image
        segmented_filename = os.path.basename(segmented_image_path)
        
        # Return the URL or path for the segmented image
        return jsonify({'message': 'File successfully uploaded and segmented', 'filename': filename, 'segmented_image_url': f'/segmented/{segmented_filename}'}), 200
    else:
        return jsonify({'error': 'File type not allowed'}), 400

@app.route('/segmented/<filename>')
def segmented_image(filename):
    return send_from_directory(app.config['SEGMENTED_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True)