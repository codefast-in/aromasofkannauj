
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  images: [{
    type: String
  }],
  category: {
    type: String,
    required: true,
    enum: ['Men', 'Women', 'Unisex']
  },
  type: {
    type: String,
    enum: ['Eau de Parfum', 'Eau de Toilette', 'Eau de Cologne', 'Perfume Oil', 'Body Mist']
  },
  notes: [{
    type: String,
    enum: ['Floral', 'Citrus', 'Woody', 'Oriental', 'Fruity', 'Green', 'Aquatic', 'Spicy', 'Gourmand', 'Musk']
  }],
  sizes: [{
    size: String,
    price: Number
  }],
  stock: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Fix: More robust check to prevent errors during hot module reloading
const Product = mongoose.models && mongoose.models.Product 
  ? mongoose.models.Product 
  : mongoose.model('Product', ProductSchema);

export default Product;
