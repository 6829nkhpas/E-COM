require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

// Use Fake Store API or custom products based on environment variable
const USE_FAKE_STORE_API = process.env.USE_FAKE_STORE_API === 'true';

// Fallback custom products if API fails or not enabled
const customProducts = [
  {
    name: "Regular Unisex T shirt",
    price: 2150.0,
    description:
      "Comfortable unisex cotton t-shirt available in multiple colors",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    category: "Clothing",
    stock: 50,
  },
  {
    name: "Korean pant",
    price: 2799.0,
    description: "Trendy Korean style pants with comfortable fit",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500",
    category: "Women's Wear",
    stock: 30,
  },
  {
    name: "Pinstripe Pyjama",
    price: 1250.0,
    description: "Comfortable pinstripe pyjama set for relaxed wear",
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=500",
    category: "Women's Wear",
    stock: 40,
  },
  {
    name: "Pencil Stripe Shirt",
    price: 1150.0,
    description: "Elegant pencil stripe shirt for formal occasions",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500",
    category: "Women's Wear",
    stock: 35,
  },
  {
    name: "Korean pant (Blue)",
    price: 2100.0,
    description: "Stylish Korean pants in classic blue color",
    image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=500",
    category: "Women's Wear",
    stock: 25,
  },
  {
    name: "Classic White Sneakers",
    price: 3500.0,
    description: "Comfortable white sneakers for everyday wear",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
    category: "Footwear",
    stock: 45,
  },
  {
    name: "Casual Denim Jacket",
    price: 4200.0,
    description: "Classic denim jacket perfect for all seasons",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500",
    category: "Clothing",
    stock: 20,
  },
  {
    name: "Leather Handbag",
    price: 5500.0,
    description: "Premium leather handbag with multiple compartments",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
    category: "Accessories",
    stock: 15,
  },
];

// Fetch products from Fake Store API
const fetchFromFakeStoreAPI = async () => {
  try {
    console.log('Fetching products from Fake Store API...');
    const fetch = (await import('node-fetch')).default;
    const response = await fetch('https://fakestoreapi.com/products');
    
    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }
    
    const apiProducts = await response.json();
    
    // Transform API products to match our schema
    const transformedProducts = apiProducts.map(product => ({
      name: product.title,
      price: product.price * 80, // Convert USD to INR (approximate)
      description: product.description,
      image: product.image,
      category: product.category,
      stock: Math.floor(Math.random() * 50) + 10, // Random stock between 10-60
    }));
    
    console.log(`✓ Fetched ${transformedProducts.length} products from Fake Store API`);
    return transformedProducts;
  } catch (error) {
    console.error('✗ Failed to fetch from Fake Store API:', error.message);
    console.log('→ Falling back to custom products');
    return customProducts;
  }
};

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    // Clear existing products
    await Product.deleteMany({});
    console.log("Cleared existing products");

    // Get products from API or use custom products
    let products;
    if (USE_FAKE_STORE_API) {
      products = await fetchFromFakeStoreAPI();
    } else {
      console.log('Using custom products (set USE_FAKE_STORE_API=true to use Fake Store API)');
      products = customProducts;
    }

    // Insert products into MongoDB for persistence
    await Product.insertMany(products);
    console.log(`✓ Seeded ${products.length} products successfully to MongoDB`);

    console.log("\n📦 Seeded Products:");
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - ₹${product.price.toFixed(2)}`);
    });

    console.log('\n✅ Database seeding complete!');
    console.log(`📊 Total products in database: ${products.length}`);
    console.log(`🗄️  Products are now persisted in MongoDB`);
    
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
