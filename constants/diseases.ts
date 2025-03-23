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
      id: 'Blight',
      name: 'Leaf Blight',
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
      id: 'Algal',
      name: 'Algal leaf spot',
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
    
    
  ];
  
  export const getDiseaseById = (id: string): Disease | undefined => {
    return diseases.find(disease => disease.id === id);
  };