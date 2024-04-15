from transformers import SegformerImageProcessor, SegformerForSemanticSegmentation
from PIL import Image
import torch  # Ensure you have PyTorch installed as it's required by transformers

# Initialize the processor and model only once to avoid reloading them on each request
processor = SegformerImageProcessor.from_pretrained("nvidia/segformer-b0-finetuned-ade-512-512")
model = SegformerForSemanticSegmentation.from_pretrained("nvidia/segformer-b0-finetuned-ade-512-512")

def segment_image(image_path):
    """
    Segments the image at the given path using the Segformer model.
    
    Args:
        image_path (str): The path to the image file to segment.
    
    Returns:
        str: The path to the segmented image.
    """
    # Load the image
    image = Image.open(image_path)

    # Process the image and perform segmentation
    inputs = processor(images=image, return_tensors="pt")
    outputs = model(**inputs)
    logits = outputs.logits  # shape (batch_size, num_labels, height/4, width/4)

    # Convert logits to an image (for simplicity, taking the argmax to get the most likely label per pixel)
    # Note: This is a simplified approach, and you might want to apply a color map or further processing
    # to convert model output to a visually meaningful segmentation map
    segmentation = logits.argmax(dim=1)[0]  # Take the highest scoring class for each pixel
    segmentation_image = segmentation.cpu().detach().numpy()  # Convert to numpy array

    # For demonstration, let's just save the segmentation as an image
    # You might want to apply a color map here to visualize different segments
    segmented_image_path = image_path.replace('.jpg', '_segmented.jpg')  # Modify as needed for other file types
    Image.fromarray(segmentation_image).save(segmented_image_path)

    return segmented_image_path