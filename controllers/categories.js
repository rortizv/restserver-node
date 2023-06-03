const { response } = require('express');
const Category = require('../models/categories');


const getCategories = async (req, res = response) => {
    try {
        // Retrieve all categories paginated
        const { limit = 5, from = 0 } = req.query;
        const query = { state: true };

        const [total, categories] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query)
                .populate('user', 'name')
                .skip(Number(from))
                .limit(Number(limit))
                //.select('-__v')
        ]);

        res.json({
            total,
            categories
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Something went wrong trying to retrieve the categories'
        });
    }
}

const getCategoryById = async (req, res = response) => {
    const { id } = req.params;
    try {
        const category = await Category.findById(id)
            .populate('user', 'name');
        
            res.json(category);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Something went wrong trying to retrieve the category'
        });
    }
}

const createCategory = async (req, res = response) => {
    console.log(req.body)
    console.log("Create category")
    const name = req.body.name.toUpperCase();
    try {
        // Check if category exists
        const categoryDB = await Category.findOne({ name });
        if (categoryDB) {
            return res.status(400).json({
                msg: `Category ${categoryDB.name} already exists`
            });
        }
        // Generate data to save
        const data = {
            name,
            user: req.user._id
        };
        const category = new Category(data);
        console.log(category);
        // Save in DB
        await category.save();
        res.status(201).json({
            msg: `Category ${category.name} created successfully`,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Something went wrong'
        });
    }
}

const updateCategory = async (req, res = response) => {
    const { id } = req.params;
    const { state, user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    try {
        const category = await Category.findByIdAndUpdate(id, data, { new: true });
        res.json({
            msg: 'Category updated successfully',
            category
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Something went wrong trying to update the category'
        });
    }
}

const deleteCategory = async (req, res = response) => {
    const { id } = req.params;
    try {
        const category = await Category.findByIdAndUpdate(id, { state: false }, { new: true });

        res.status(200).json({
            msg: 'Category deleted successfully',
            category
        });
    } catch (err) {
    }
}


module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}