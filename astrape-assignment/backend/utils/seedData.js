const Item = require('../models/Item');

const seedData = async () => {
  try {
    const itemCount = await Item.countDocuments();
    
    if (itemCount === 0) {
      const items = [
        {
          name: 'Wireless Headphones',
          price: 99.99,
          category: 'Electronics',
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
          description: 'High-quality wireless headphones with noise cancellation',
          stock: 50
        },
        {
          name: 'Smartphone',
          price: 699.99,
          category: 'Electronics',
          image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
          description: 'Latest smartphone with advanced features',
          stock: 30
        },
        {
          name: 'Running Shoes',
          price: 129.99,
          category: 'Fashion',
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
          description: 'Comfortable running shoes for daily workouts',
          stock: 40
        },
        {
          name: 'Coffee Maker',
          price: 89.99,
          category: 'Home',
          image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop',
          description: 'Automatic coffee maker with programmable settings',
          stock: 25
        },
        {
          name: 'Laptop',
          price: 1299.99,
          category: 'Electronics',
          image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop',
          description: 'Powerful laptop for work and gaming',
          stock: 20
        },
        {
          name: 'Winter Jacket',
          price: 199.99,
          category: 'Fashion',
          image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop',
          description: 'Warm winter jacket with premium insulation',
          stock: 35
        },
        {
          name: 'Desk Lamp',
          price: 49.99,
          category: 'Home',
          image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=300&fit=crop',
          description: 'LED desk lamp with adjustable brightness',
          stock: 45
        },
        {
          name: 'Fitness Tracker',
          price: 79.99,
          category: 'Electronics',
          image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=300&h=300&fit=crop',
          description: 'Smart fitness tracker with heart rate monitor',
          stock: 60
        }
      ];
      
      await Item.insertMany(items);
      console.log('Items seeded successfully');
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

module.exports = seedData;