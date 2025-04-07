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
      description: 'Leaf blight is a fungal or bacterial disease that causes severe damage to lanzones trees, affecting the leaves and reducing fruit yield. It thrives in humid and wet conditions, spreading rapidly if untreated.',
      symptoms: [
        'Irregular brown or black spots on leaves',
    'Yellowing and curling of leaves',
    'Wilting and premature leaf drop',
    'Leaves with water-soaked lesions that expand over time',
    'Defoliation and stunted growth in severe cases'
      ],
      treatment: 'Use copper-based fungicides or Mancozeb to control fungal infections. Water at the base of plants to keep foliage dry.',
      imageUrl: 'https://images.unsplash.com/photo-1598512199776-e0e1a84efadc?q=80&w=1000'
    },
    {
      id: 'Algal',
      name: 'Algal leaf spot',
      description: 'Algal leaf spot, also known as red rust, is caused by parasitic algae that infect the leaves, twigs, and branches of lanzones trees. It thrives in warm, humid environments and appears as raised, orange to reddish-brown spots on the foliage. While not usually fatal, severe infections can weaken trees and reduce fruit yield.',
      symptoms: [
        'Circular orange, reddish-brown, or rust-colored spots on leaves',
        'Spots may have a velvety or powdery texture',
        'Yellowing and premature leaf drop in severe cases',
        'Can spread to twigs and branches, causing cracking and dieback'
      ],
      treatment: 'Treatment includes removing affected parts, applying fungicides, improving air circulation, and Trim overcrowded branches to reduce moisture retention.',
      imageUrl: 'https://images.unsplash.com/photo-1598512199776-e0e1a84efadc?q=80&w=1000'
    },
    
    {
      id: 'test',
      name: 'te',
      description: 'Algal leaf spot, also known as red rust, is caused by parasitic algae that infect the leaves, twigs, and branches of lanzones trees. It thrives in warm, humid environments and appears as raised, orange to reddish-brown spots on the foliage. While not usually fatal, severe infections can weaken trees and reduce fruit yield.',
      symptoms: [
        'Circular orange, reddish-brown, or rust-colored spots on leaves',
        'Spots may have a velvety or powdery texture',
        'Yellowing and premature leaf drop in severe cases',
        'Can spread to twigs and branches, causing cracking and dieback'
      ],
      treatment: 'Treatment includes removing affected parts, applying fungicides, improving air circulation, and Trim overcrowded branches to reduce moisture retention.',
      imageUrl: 'https://images.unsplash.com/photo-1598512199776-e0e1a84efadc?q=80&w=1000'
    },
    
  ];
  
  export const getDiseaseById = (id: string): Disease | undefined => {
    return diseases.find(disease => disease.id === id);
  };