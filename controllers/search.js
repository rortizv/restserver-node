const { response } = require('express');
const { getDbCollections } = require('../database/config');
const { ObjectId } = require('mongoose').Types;
const { User, Category, Product } = require('../models');


const search = async (req, res = response) => {
    const { collection, param } = req.params;
    const collections = await getDbCollections();

    const collectionExists = collections.some((coll) => coll.name === collection);
    if (!collectionExists) {
        return res.status(400).json({
            msg: `The collection ${collection} does not exist`
        });
    }
    
    switch (collection) {
        case 'users':
            searchUsers(param, res);
            break;
        case 'categories':
            searchCategories(param, res);
            break;
        case 'products':
            searchProducts(param, res);
            break;
        default:
            return res.status(500).json({
                msg: 'Internal server error'
            });
    }
};

const searchUsers = async (param = '', res = response) => {
    const isMongoId = ObjectId.isValid(param);
    if (isMongoId) {
        const user = await User.findById(param);
        return res.json({
            results: (user) ? [user] : []
        });
    }

    const regex = new RegExp(param, 'i');

    const users = await User.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ state: true }]
    });
    
    res.json({
        results: users
    });    
};

const searchProducts = async (param = '', res = response) => {
    const isMongoId = ObjectId.isValid(param);
    if (isMongoId) {
        const product = await Product.findById(param).populate('category', 'name');
        return res.json({
            results: (product) ? [product] : []
        });
    }

    const regex = new RegExp(param, 'i');

    const products = await Product.find({
        $or: [{ name: regex , state: true }]
    }).populate('category', 'name');
    
    res.json({
        results: products
    });
};

const searchCategories = async (param = '', res = response) => {
    const isMongoId = ObjectId.isValid(param);
    if (isMongoId) {
        const category = await Category.findById(param);
        return res.json({
            results: (category) ? [category] : []
        });
    }
    
    const regex = new RegExp(param, 'i');
    const categories = await Category.find({ name: regex, state: true });

    res.json({
        results: categories
    });
}

module.exports = {
    search,
    searchCategories,
    searchProducts,
    searchUsers
};