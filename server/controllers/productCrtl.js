const Product = require("../models/productModel");

// Create Product
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, images, category, type, notes, sizes, stock, featured } = req.body;

        const product = new Product({
            name,
            description,
            price,
            images: images ? JSON.parse(images) : [],
            category,
            type,
            notes: notes ? JSON.parse(notes) : [],
            sizes: sizes ? JSON.parse(sizes) : [],
            stock,
            featured
        });

        await product.save();
        res.status(201).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get All Products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Single Product
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update Product
exports.updateProduct = async (req, res) => {
    try {
        const { images, notes, sizes, ...rest } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                ...rest,
                images: images ? JSON.parse(images) : undefined,
                notes: notes ? JSON.parse(notes) : undefined,
                sizes: sizes ? JSON.parse(sizes) : undefined,
            },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, product: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
