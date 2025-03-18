# TensorFlow Lite Model

Place your trained TensorFlow Lite model file `disease_detection_model_quantized.tflite` in this directory.

This model was trained using MobileNetV2 architecture to detect various diseases from images, including:

- Skin conditions (melanoma, basal cell carcinoma, squamous cell carcinoma)
- Plant diseases (leaf blight, leaf rust)
- Medical conditions (diabetic retinopathy, pneumonia)

## Model Specifications

- Input shape: 224x224x3 (RGB image)
- Input normalization: Values scaled to [0,1]
- Output: 7 class probabilities corresponding to disease classes
- Model size: Quantized for optimal mobile performance
- Architecture: MobileNetV2 with custom classification head
