# TensorFlow Lite Model Integration Guide

This document explains how to integrate the trained TensorFlow Lite model into the Disease Detection app.

## Model File

The app uses a TensorFlow Lite model named `disease_detection_model_quantized.tflite` for disease detection. This model was trained using MobileNetV2 architecture to classify various diseases from images.

## Model Placement

1. Place the `disease_detection_model_quantized.tflite` file in the following directory:

   ```
   assets/model/disease_detection_model_quantized.tflite
   ```

2. The model file is loaded by the `use-tensorflow.ts` hook when the app starts.

## Model Specifications

- **Input Shape**: 224x224x3 (RGB image)
- **Input Preprocessing**:
  - Resize image to 224x224
  - Convert pixel values to float32
  - Normalize pixel values to [0,1] range
- **Output**: Array of 7 probability values corresponding to disease classes
- **Classes**: The model outputs probabilities for the following diseases:
  - melanoma
  - basal_cell_carcinoma
  - squamous_cell_carcinoma
  - plant_leaf_blight
  - plant_leaf_rust
  - diabetic_retinopathy
  - pneumonia

## Implementation Details

The model integration is handled by the `use-tensorflow.ts` hook, which:

1. Initializes TensorFlow.js
2. Loads the model
3. Preprocesses images for inference
4. Runs the model on input images
5. Processes and returns prediction results

## Usage in the App

The model is used in the `scan.tsx` screen:

1. When a user selects or captures an image, it's passed to the `predict` function
2. The image is preprocessed to match the model's input requirements
3. The model performs inference on the preprocessed image
4. The prediction results are displayed to the user

## Troubleshooting

If you encounter issues with model loading or inference:

1. Ensure the model file is correctly placed in the assets/model directory
2. Check that the model file is the quantized version optimized for mobile
3. Verify that the app has sufficient permissions to access the file
4. Monitor the console logs for specific error messages

## Performance Considerations

- The quantized model is optimized for mobile performance
- First inference may be slower as the model is loaded into memory
- Subsequent inferences should be faster
- Consider implementing a loading indicator during model initialization and inference
