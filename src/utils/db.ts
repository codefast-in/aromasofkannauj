
import mongoose from 'mongoose';
import { MONGODB_URL } from '@/config/constants';

if (!MONGODB_URL) {
  throw new Error('Please define the MONGODB_URL environment variable');
}

let cachedConnection = { conn: null as mongoose.Connection | null, promise: null as Promise<mongoose.Connection> | null };

export async function connectToDatabase() {
  if (cachedConnection.conn) {
    return cachedConnection.conn;
  }

  if (!cachedConnection.promise) {
    const opts = {
      bufferCommands: false,
    };

    mongoose.set('strictQuery', false);

    cachedConnection.promise = mongoose.connect(MONGODB_URL, opts)
      .then((mongoose) => {
        console.log('MongoDB connected successfully');
        return mongoose.connection;
      })
      .catch(err => {
        console.error('MongoDB connection error:', err);
        cachedConnection.promise = null;
        throw err;
      });
  }

  try {
    cachedConnection.conn = await cachedConnection.promise;
  } catch (e) {
    cachedConnection.promise = null;
    throw e;
  }

  return cachedConnection.conn;
}

// Optional function to seed some initial products if none exist
export async function seedInitialProducts() {
  try {
    const Product = mongoose.models.Product;
    
    if (!Product) {
      console.warn('Product model not available for seeding');
      return;
    }
    
    const count = await Product.countDocuments();
    
    if (count === 0) {
      console.log('No products found, seeding initial data...');
      
      // Import sample products from mock data
      const { perfumes } = await import('@/services/mockData');
      
      // Insert sample products
      if (Array.isArray(perfumes) && perfumes.length > 0) {
        const sampleProducts = perfumes.slice(0, 10).map(product => ({
          ...product,
          _id: undefined,
          id: undefined
        }));
        
        await Product.insertMany(sampleProducts);
        console.log(`Seeded ${sampleProducts.length} products successfully`);
      }
    }
  } catch (error) {
    console.error('Error seeding products:', error);
  }
}
