from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
# Enable CORS for all domains on all routes
CORS(app)

# Configure the upload folder and allowed extensions
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
   return '.' in filename and \
              filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload-image', methods=['POST'])
def upload_image():
   if 'image' not in request.files:
       return jsonify({'error': 'No file part'}), 400
   file = request.files['image']
   if file.filename == '':
       return jsonify({'error': 'No selected file'}), 400
   if file and allowed_file(file.filename):
       filename = file.filename
       file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
       return jsonify({'message': 'File uploaded successfully', 'filename': filename}), 200
   else:
       return jsonify({'error': 'File type not allowed'}), 400
   
@app.route('/')
def home():
    return "hello World"

if __name__ == '__main__':
   os.makedirs(UPLOAD_FOLDER, exist_ok=True)
   app.run(debug=True)