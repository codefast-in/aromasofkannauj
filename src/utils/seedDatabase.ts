
import { connectToDatabase } from './db';
import Product from '@/models/Product';
import User from '@/models/User';
import Order from '@/models/Order';
import Coupon from '@/models/Coupon';
import { perfumes, users, orders, coupons } from '@/services/mockData';
import bcrypt from 'bcryptjs';

export const seedDatabase = async () => {
  try {
    await connectToDatabase();
    
    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});
    await Coupon.deleteMany({});
    
    console.log('Existing data cleared. Starting seed...');
    
    // Seed users with hashed passwords
    const createdUsers = await Promise.all(
      users.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        
        const newUser = new User({
          name: user.name,
          email: user.email,
          password: hashedPassword,
          role: user.role,
          createdAt: user.createdAt
        });
        
        await newUser.save();
        return { ...newUser.toObject(), id: newUser._id.toString() };
      })
    );
    
    console.log(`${createdUsers.length} users created`);
    
    // Seed products
    const createdProducts = await Promise.all(
      perfumes.map(async (perfume) => {
        const newProduct = new Product({
          name: perfume.name,
          description: perfume.description,
          price: perfume.price,
          images: perfume.images,
          category: perfume.category,
          type: perfume.type,
          notes: perfume.notes,
          sizes: perfume.sizes,
          stock: perfume.stock,
          rating: perfume.rating,
          reviewCount: perfume.reviewCount,
          featured: perfume.featured
        });
        
        await newProduct.save();
        return { ...newProduct.toObject(), id: newProduct._id.toString() };
      })
    );
    
    console.log(`${createdProducts.length} products created`);
    
    // Create a map of old IDs to new IDs for products
    const productIdMap = new Map();
    createdProducts.forEach((product, index) => {
      productIdMap.set(perfumes[index].id, product._id.toString());
    });
    
    // Create a map of old IDs to new IDs for users
    const userIdMap = new Map();
    createdUsers.forEach((user, index) => {
      userIdMap.set(users[index].id, user._id.toString());
    });
    
    // Seed orders with the new IDs
    const createdOrders = await Promise.all(
      orders.map(async (order) => {
        const newOrder = new Order({
          userId: userIdMap.get(order.userId),
          products: order.products.map(item => ({
            productId: productIdMap.get(item.productId),
            quantity: item.quantity,
            size: item.size,
            price: item.price
          })),
          totalAmount: order.totalAmount,
          shippingAddress: order.shippingAddress,
          paymentMethod: order.paymentMethod,
          status: order.status,
          createdAt: order.createdAt
        });
        
        await newOrder.save();
        return newOrder;
      })
    );
    
    console.log(`${createdOrders.length} orders created`);
    
    // Seed coupons
    const createdCoupons = await Promise.all(
      coupons.map(async (coupon) => {
        const newCoupon = new Coupon({
          code: coupon.code,
          discountPercentage: coupon.discountPercentage,
          maxDiscount: coupon.maxDiscount,
          minPurchase: coupon.minPurchase,
          validFrom: coupon.validFrom,
          validUntil: coupon.validUntil,
          isActive: coupon.isActive
        });
        
        await newCoupon.save();
        return newCoupon;
      })
    );
    
    console.log(`${createdCoupons.length} coupons created`);
    
    console.log('Database seeded successfully!');
    return {
      users: createdUsers.length,
      products: createdProducts.length,
      orders: createdOrders.length,
      coupons: createdCoupons.length
    };
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};

// Execute the seed function if this script is run directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('Seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
}
