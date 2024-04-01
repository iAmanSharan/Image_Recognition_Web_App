import logging
import os
from pathlib import Path

list_of_files = [
    "content.html",
    "style.css",
    "script.js",
    "api.js",
    "app.py",
    "requirements.txt",
    "image_segmentation.py",
    "object_detection_2d.py",
    "object_detection_3d.py",
    "package.json",
    "tests/unit_tests.py",
    "tests/integration_tests.py",
]

for file in list_of_files:
    file_path = Path(file)
    file_path.parent.mkdir(parents=True, exist_ok=True)  
    file_path.touch(exist_ok=True) 
    
    