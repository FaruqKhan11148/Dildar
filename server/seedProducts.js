const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./models/Product');

const products = [
  {
    name: 'Whole Chicken',
    price: 250,
    image:
      'https://images.unsplash.com/photo-1587593810167-a84920ea0781?q=80&w=1200&auto=format&fit=crop',
    description: 'Fresh whole chicken cleaned and hygienically packed',
    category: 'Chicken',
    stock: 50,
    unit: 'kg',
  },
  {
    name: 'Fresh Chicken Curry Cut',
    price: 220,
    image:
      'https://assets.tendercuts.in/product/C/H/594e4559-f6b7-417d-9aac-d0643b5711d3.jpg',
    description: 'Fresh cut chicken pieces perfect for curry',
    category: 'Chicken',
    stock: 100,
    unit: 'kg',
  },
  {
    name: 'Chicken Breast Boneless',
    price: 320,
    image:
      'https://static.freshtohome.com/cdn-cgi/image/width=600/https://static.freshtohome.com/media/catalog/product/c/h/chicken_breast_fillet_1.jpg',
    description: 'Lean boneless chicken breast',
    category: 'Chicken',
    stock: 80,
    unit: 'kg',
  },
  {
    name: 'Chicken Wings',
    price: 180,
    image:
      'https://onestophalal.com/cdn/shop/articles/raw_chicken_wings_1200x.jpg?v=1710053212',
    description: 'Crispy wings for frying & grilling',
    category: 'Chicken',
    stock: 120,
    unit: 'kg',
  },
  {
    name: 'Chicken Liver & Heart Mix',
    price: 160,
    image:
      'https://img.freepik.com/premium-photo/raw-chicken-liver-kidneys-heart-poultry-entrails-offal-prepared-cooking-diet-high-heme-iron-against-anemia-meat-white-background_565632-1613.jpg',
    description:
      'Fresh chicken liver and heart mix rich in protein and nutrients',
    category: 'Chicken',
    stock: 60,
    unit: 'kg',
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Product.deleteMany(); // clean old data
    await Product.insertMany(products);

    console.log('🔥 Products seeded successfully');
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

seed();
