const { response } = require('express');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/user');


const getUsers = async(req, res = response) => {
    const { limit = 15, from = 0 } = req.query;
    const query = { state: true };

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.status(200).json({
        total,
        users
    });
}

const createUser = async (req, res = response) => {
    
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

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

const updatePutUser = async(req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;
    
    if (password) {
        // Encrypt password
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest);

    res.status(200).json({
        msg: `User ${email} was updated successfully`,
        user
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

const deleteUser = async(req, res = response) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { state: false });

    res.json({
        msg: `User with id ${id} was deleted successfully`,
        user
    });
}

module.exports = {
    getUsers,
    createUser,
    updatePutUser,
    updatePatchUser,
    deleteUser
}