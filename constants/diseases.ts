export interface Disease {
    id: string;
    name: string;
    description: string;
    symptoms: string[];
    treatment: string;
    imageUrl: string;
  }
  
  export const diseases: Disease[] = [
  
    {
      id: 'plant_leaf_blight',
      name: 'Plant Leaf Blight',
      description: 'Leaf blight is a common disease in plants caused by fungi or bacteria that affects the leaves, causing them to wither and die.',
      symptoms: [
        'Brown or black spots on leaves',
        'Yellowing of leaves',
        'Wilting',
        'Leaf drop',
        'Stunted growth'
      ],
      treatment: 'Treatment includes removing affected leaves, applying fungicides, improving air circulation, and avoiding overhead watering.',
      imageUrl: 'https://images.unsplash.com/photo-1598512199776-e0e1a84efadc?q=80&w=1000'
    },
    {
      id: 'plant_leaf_rust',
      name: 'Plant Leaf Rust',
      description: 'Rust is a fungal disease that affects various plants, causing rusty spots on leaves and stems.',
      symptoms: [
        'Rusty, orange, or reddish-brown spots on leaves',
        'Powdery pustules on the undersides of leaves',
        'Yellowing and wilting of leaves',
        'Premature leaf drop',
        'Stunted growth'
      ],
      treatment: 'Treatment includes removing affected parts, applying fungicides, improving air circulation, and avoiding overhead watering.',
      imageUrl: 'https://images.unsplash.com/photo-1598512199776-e0e1a84efadc?q=80&w=1000'
    },
    
    {
      id: 'pneumonia',
      name: 'test',
      description: 'Pneumonia is an infection that inflames the air sacs in one or both lungs. The air sacs may fill with fluid or pus, causing cough with phlegm or pus, fever, chills, and difficulty breathing.',
      symptoms: [
        'Chest pain when breathing or coughing',
        'Confusion or changes in mental awareness (in adults age 65 and older)',
        'Cough, which may produce phlegm',
        'Fatigue',
        'Fever, sweating and shaking chills'
      ],
      treatment: 'Treatment includes antibiotics for bacterial pneumonia, antiviral medications for viral pneumonia, fever reducers, and cough medicine.',
      imageUrl: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=1000'
    }
  ];
  
  export const getDiseaseById = (id: string): Disease | undefined => {
    return diseases.find(disease => disease.id === id);
  };