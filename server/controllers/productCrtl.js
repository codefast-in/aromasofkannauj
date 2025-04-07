const Product = require("../models/productModel");

// Create Product
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      images,
      category,
      type,
      notes,
      sizes,
      stock,
      featured,
    } = req.body;

    console.log(images)
    const product = new Product({
      name,
      description,
      price,
      images: images ? images : [],
      category,
      type,
      notes: notes ? notes : [],
      sizes: sizes ? sizes : [],
      stock,
      featured,
    });

    await product.save();
    res.status(201).json({success: true, product});
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};

// Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      notes,
      types,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 12,
    } = req.query;
console.log(req.query)
    const query = {};

    // Search by name or description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by notes (comma-separated)
    if (notes) {
      query.notes = { $all: notes.split(',') };
    }

    // Filter by type (comma-separated)
    if (types) {
      query.type = { $in: types.split(',') };
    }

    // Price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Pagination
    const skip = (page - 1) * limit;

    // Sorting
    let sortBy = {};
    if (sort === "price_asc") sortBy.price = 1;
    else if (sort === "price_desc") sortBy.price = -1;
    else if (sort === "newest") sortBy.createdAt = -1;

    const products = await Product.find(query)
      .sort(sortBy)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      products,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Get Single Product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({success: false, message: "Product not found"});
    }
    res.status(200).json({success: true, product});
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const {images, notes, sizes, stock, ...rest} = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...rest,
        stock: stock ? stock : undefined,
        images: images ? images : undefined,
        notes: notes ? notes : undefined,
        sizes: sizes ? sizes : undefined,
      },
      {new: true, runValidators: true}
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({success: false, message: "Product not found"});
    }

    res.status(200).json({success: true, product: updatedProduct});
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({success: false, message: "Product not found"});
    }
    res
      .status(200)
      .json({success: true, message: "Product deleted successfully"});
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};
