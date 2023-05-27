const { response } = require('express');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/user');


const getUsers = (req, res = response) => {
    const queryParams = req.query;
    res.status(200).json({
        msg: 'GET - controller',
        queryParams
    });
}

const createUser = async (req, res = response) => {
    
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    // Verify if email exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
        return res.status(400).json({
            msg: 'Email already exists'
        });
    }
    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    // Save user
    await user.save();
    res.status(201).json({
        msg: 'User created successfully',
        user
    });
}

const updatePutUser = (req, res = response) => {
    const id = req.params.id;
    const body = req.body;
    res.status(400).json({
        msg: `Id to update: ${id}`,
        body
    });
}

const updatePatchUser = (req, res = response) => {
    const id = req.params.id;
    const body = req.body;
    res.status(200).json({
        msg: `Id to update: ${id}`,
        body
    });
}

const deleteUser = (req, res = response) => {
    res.status(200).json({
        msg: 'DELETE - controller'
    });
}

module.exports = {
    getUsers,
    createUser,
    updatePutUser,
    updatePatchUser,
    deleteUser
}