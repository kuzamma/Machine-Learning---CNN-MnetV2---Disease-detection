# Disease Detection App

A React Native mobile application that uses machine learning to detect diseases from images. The app can identify various conditions including skin diseases, plant diseases, and medical conditions using a trained TensorFlow Lite model.

## Features

- Capture photos or select from gallery
- AI-powered disease detection
- Detailed disease information
- History of previous scans
- Cross-platform (iOS, Android, and web)

## System Requirements

- Node.js (v16 or newer)
- npm or yarn or bun
- Expo CLI
- For iOS development: macOS with Xcode
- For Android development: Android Studio with SDK
- For model training (optional): Python 3.8+ with TensorFlow

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/disease-detection-app.git
cd disease-detection-app
```

### 2. Install dependencies

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn install
```

Using bun:

```bash
bun install
```

### 3. Set up the TensorFlow Lite model

1. Create a directory for the model if it doesn't exist:

```bash
mkdir -p assets/model
```

2. Place your trained TensorFlow Lite model file in the assets/model directory:

```bash
# If you have your own model
cp /path/to/your/disease_detection_model_quantized.tflite assets/model/

# If you want to use our pre-trained model
# Download from the releases page or use the one provided in the repository
```

## Running the App

### Start the development server

```bash
# Using Expo CLI
npx expo start

# With tunnel option (for running on physical devices over the internet)
npx expo start --tunnel

# For web
npx expo start --web
```

### Running on iOS Simulator

```bash
npx expo run:ios
```

### Running on Android Emulator

```bash
npx expo run:android
```

### Running on Physical Devices

1. Install the Expo Go app on your device
2. Scan the QR code from the terminal after running `npx expo start --tunnel`

## Model Training (Optional)

If you want to train your own disease detection model, follow these steps:

1. Install Python requirements:

```bash
pip install -r requirements.txt
```

2. Run the training script:

```bash
python scripts/train_model.py
```

3. Convert the model to TensorFlow Lite format:

```bash
python scripts/convert_to_tflite.py
```

4. Move the generated TFLite model to the assets/model directory:

```bash
mv disease_detection_model_quantized.tflite assets/model/
```

## Project Structure

```
disease-detection-app/
├── app/                    # Expo Router app directory
│   ├── (tabs)/             # Tab-based navigation
│   │   ├── index.tsx       # Home screen
│   │   ├── scan.tsx        # Scan screen
│   │   ├── history.tsx     # History screen
│   │   ├── settings.tsx    # Settings screen
│   │   └── _layout.tsx     # Tab layout
│   ├── disease-details.tsx # Disease details screen
│   ├── result-details.tsx  # Scan result details screen
│   ├── model-info.tsx      # Model information screen
│   └── _layout.tsx         # Root layout
├── assets/                 # Static assets
│   ├── images/             # App images
│   └── model/              # TensorFlow Lite model
├── components/             # Reusable components
├── constants/              # App constants
├── hooks/                  # Custom hooks
├── stores/                 # State management
├── scripts/                # Python scripts for model training
└── docs/                   # Documentation
```

## Troubleshooting

### Common Issues

1. **"Unable to resolve module '@tensorflow/tfjs'"**

   - Make sure you've installed all dependencies: `npm install`
   - Check that the TensorFlow packages are in your package.json

2. **"Error loading TensorFlow model"**

   - Verify that the model file exists in the correct location: `assets/model/disease_detection_model_quantized.tflite`
   - Check that the model format is compatible with TensorFlow.js

3. **Camera not working**

   - Ensure you've granted camera permissions
   - On web, camera access requires HTTPS or localhost

4. **App crashing on startup**
   - Check the console logs for specific error messages
   - Verify that all dependencies are correctly installed
   - Make sure the model file is not corrupted

### Platform-Specific Issues

#### iOS

- If you encounter build issues, try cleaning the build: `npx expo prebuild --clean`
- For camera issues, check Info.plist for proper camera usage description

#### Android

- For permission issues, verify AndroidManifest.xml has the required permissions
- If the app crashes when loading the model, check that the model size is not too large

#### Web

- TensorFlow.js has some limitations on web. Check the console for specific warnings
- Camera access requires secure context (HTTPS or localhost)

## License

[MIT License](LICENSE)

## Acknowledgements

- TensorFlow for the machine learning framework
- Expo for the React Native development platform
- The open-source community for various libraries used in this project
