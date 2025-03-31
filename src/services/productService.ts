
import Product from '@/models/Product';
import { connectToDatabase } from '@/utils/db';
import { uploadImage, uploadMultipleImages } from '@/utils/cloudinary';
import mongoose from 'mongoose';

export const getProducts = async (params: any = {}) => {
  try {
    await connectToDatabase();
    
    const { 
      page = 1, 
      limit = 12, 
      search = '', 
      category = '', 
      notes = '',
      minPrice, 
      maxPrice,
      sort = 'createdAt_desc'
    } = params;
    
    const query: any = {};
    
    // Search by name or description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Filter by notes
    if (notes) {
      const notesList = notes.split(',');
      query.notes = { $in: notesList };
    }
    
    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    
    // Sort options
    const [sortField, sortOrder] = sort.split('_');
    const sortOptions: { [key: string]: mongoose.SortOrder } = {};
    sortOptions[sortField] = sortOrder === 'asc' ? 1 : -1;
    
    // Execute query with pagination
    const skip = (Number(page) - 1) * Number(limit);
    
    const products = await Product.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));
      
    const totalProducts = await Product.countDocuments(query);
    
    return {
      products,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(totalProducts / Number(limit)),
        totalItems: totalProducts
      }
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id: string) => {
  try {
    await connectToDatabase();
    const product = await Product.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};

export const getFeaturedProducts = async () => {
  try {
    await connectToDatabase();
    const featuredProducts = await Product.find({ featured: true }).limit(8);
    return featuredProducts;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    throw error;
  }
};

export const createProduct = async (productData: any, imageFiles: File[]) => {
  try {
    await connectToDatabase();
    
    let imageUrls: string[] = [];
    
    // Upload images if provided
    if (imageFiles && imageFiles.length > 0) {
      imageUrls = await uploadMultipleImages(imageFiles);
    }
    
    // Create product with image URLs
    const newProduct = {
      ...productData,
      price: Number(productData.price),
      stock: productData.stock ? Number(productData.stock) : 0,
      images: imageUrls,
      rating: 0,
      reviewCount: 0
    };
    
    const product = new Product(newProduct);
    await product.save();
    
    return product;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (id: string, productData: any, newImageFiles?: File[]) => {
  try {
    await connectToDatabase();
    
    const product = await Product.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    
    // Handle image uploads if any new images
    if (newImageFiles && newImageFiles.length > 0) {
      const newImageUrls = await uploadMultipleImages(newImageFiles);
      
      // Combine with existing images or replace them
      if (productData.keepExistingImages) {
        productData.images = [...product.images, ...newImageUrls];
      } else {
        productData.images = newImageUrls;
      }
    }
    
    // Update numeric values
    if (productData.price) {
      productData.price = Number(productData.price);
    }
    
    if (productData.stock) {
      productData.stock = Number(productData.stock);
    }
    
    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: productData },
      { new: true }
    );
    
    return updatedProduct;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    await connectToDatabase();
    await Product.findByIdAndDelete(id);
    return { success: true };
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
