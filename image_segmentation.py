import torch
from PIL import Image
from transformers import SegformerFeatureExtractor, SegformerForSemanticSegmentation
import numpy as np
from torchvision.transforms import functional as F

def load_model():
    # Load feature extractor and model from Hugging Face
    feature_extractor = SegformerFeatureExtractor.from_pretrained("nvidia/segformer-b0-finetuned-cityscapes-1024-1024")
    model = SegformerForSemanticSegmentation.from_pretrained("nvidia/segformer-b0-finetuned-cityscapes-1024-1024")
    return feature_extractor, model

def preprocess_image(image_path, feature_extractor):
    # Load image and preprocess
    image = Image.open(image_path).convert("RGB")
    inputs = feature_extractor(images=image, return_tensors="pt")
    return inputs['pixel_values']

def segment_image(pixel_values, model):
    # Perform segmentation
    model.eval()
    with torch.no_grad():
        outputs = model(pixel_values)
    return outputs.logits

def save_segmented_image(logits, feature_extractor, output_path):
    # Convert logits to image
    logits = logits[0]  # we only processed one image
    seg_image = torch.argmax(logits, dim=0)
    seg_image = seg_image.detach().cpu().numpy()
    colorized_image = feature_extractor.decode_segmentation(seg_image)
    colorized_image = Image.fromarray(colorized_image.astype('uint8'), 'RGB')
    colorized_image.save(output_path)

def process_image(image_path, output_path):
    feature_extractor, model = load_model()
    pixel_values = preprocess_image(image_path, feature_extractor)
    logits = segment_image(pixel_values, model)
    save_segmented_image(logits, feature_extractor, output_path)

# Example usage
process_image('path_to_your_image.jpg', 'output_segmented_image.jpg')