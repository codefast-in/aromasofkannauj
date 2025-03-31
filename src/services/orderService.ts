
import Order from '@/models/Order';
import { connectToDatabase } from '@/utils/db';

export const getOrders = async (params: any = {}) => {
  try {
    await connectToDatabase();
    
    const { page = 1, limit = 10, userId, status } = params;
    
    const query: any = {};
    
    // Filter by user if provided
    if (userId) {
      query.userId = userId;
    }
    
    // Filter by status if provided
    if (status) {
      query.status = status;
    }
    
    // Execute query with pagination
    const skip = (Number(page) - 1) * Number(limit);
    
    const orders = await Order.find(query)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
      
    const totalOrders = await Order.countDocuments(query);
    
    return {
      orders,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(totalOrders / Number(limit)),
        totalItems: totalOrders
      }
    };
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const getOrderById = async (id: string) => {
  try {
    await connectToDatabase();
    const order = await Order.findById(id)
      .populate('userId', 'name email')
      .populate({
        path: 'products.productId',
        select: 'name images'
      });
      
    if (!order) {
      throw new Error('Order not found');
    }
    
    return order;
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    throw error;
  }
};

export const createOrder = async (orderData: any) => {
  try {
    await connectToDatabase();
    const order = new Order(orderData);
    await order.save();
    return order;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const updateOrder = async (id: string, orderData: any) => {
  try {
    await connectToDatabase();
    const order = await Order.findByIdAndUpdate(
      id,
      { $set: orderData },
      { new: true }
    );
    
    if (!order) {
      throw new Error('Order not found');
    }
    
    return order;
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
};

export const deleteOrder = async (id: string) => {
  try {
    await connectToDatabase();
    await Order.findByIdAndDelete(id);
    return { success: true };
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};
