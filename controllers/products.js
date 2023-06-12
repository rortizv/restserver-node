const { response } = require('express');
const Product = require('../models/product');
const Category = require('../models/category');


const getProducts = async (req, res = response) => {
    try {
        // Retrieve all products paginated
        const { limit = 5, from = 0 } = req.query;
        const query = { state: true };

        const [total, products] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .populate('category', 'name')
                .populate('user', 'name')
                .skip(Number(from))
                .limit(Number(limit))
                //.select('-__v')
        ]);

        res.json({
            total,
            products
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Something went wrong trying to retrieve the products'
        });
    }
}

const getProductById = async (req, res = response) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id).populate('user', 'name');
        
        if (!product) {
            return res.status(404).json({
                msg: `Product with id ${id} does not exists in database`
            });
        }

        if (!product.state) {
            return res.status(200).json({
                msg: 'Product is not active in the database'
            });
        }

        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Something went wrong trying to retrieve the product'
        });
    }
};

const createProduct = async (req, res = response) => {
    console.log(req);
    const name = req.body.name;
    req.body.price > 0 ? price = req.body.price : price = 0;
    const { state, user, ...body } = req.body;

    try {
        // Check if product exists
        const productDB = await Product.findOne({ name });
        if (productDB) {
            return res.status(400).json({
                msg: `Product ${productDB.name} already exists`
            });
        }

        // Generate data to save
        const data = {
            ...body,
            user: req.user._id
        };
        const product = new Product(data);
        console.log(product);
        // Save in DB
        await product.save();
        res.status(201).json({
            msg: `Product ${product.name} created successfully`,
            product
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Something went wrong trying to create the product'
        });
    }
}

const updateProduct = async (req, res = response) => {
    const { id } = req.params;
    const { state, user, ...data } = req.body;
    
    data.user = req.user._id;

    try {
        const product = await Product.findByIdAndUpdate(id, data, { new: true });
        res.json({
            msg: 'Product updated successfully',
            product
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Something went wrong trying to update the product'
        });
    }
}

const deleteProduct = async (req, res = response) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndUpdate(
            id,
            { state: false },
            { new: true }
        );

        console.log(product);

        if (!product) {
            return res.status(404).json({
                msg: `Product with id ${id} was not found`
            });
        }

        res.status(200).json({
            msg: 'Product deleted successfully',
            product
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Something went wrong trying to delete the product'
        });
    }
};


module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}