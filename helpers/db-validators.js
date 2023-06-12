const Category = require('../models/category');
const Product = require('../models/product');
const Role     = require('../models/role');
const User     = require('../models/user');


const isValidRole = async(role = '') => {
    const existsRole = await Role.findOne({ role });
    if (!existsRole) {
            throw new Error(`Role ${role} is not registered in the database`);
    }
}

const emailExists = async(email = '') => {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
        throw new Error(`User ${email} already exists in the database`);
    }
}

const idExists = async(id = '') => {
    const idExists = await User.findById(id);
    if (!idExists) {
        throw new Error(`Id ${id} does not exist in the database`);
    }
}

const categoryByIdExists = async(id = '') => {
    const categoryExists = await Category.findById(id);
    if (!categoryExists) {
        throw new Error(`Category does not exist in the database`);
    }
}

const productByIdExists = async(id = '') => {
    const productExists = await Product.findById(id);
    if (!productExists) {
        throw new Error(`Product does not exist in the database`);
    }
}

module.exports = {
    isValidRole,
    categoryByIdExists,
    emailExists,
    idExists,
    productByIdExists
}