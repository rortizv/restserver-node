const { response } = require('express');


const getUsers = (req, res = response) => {
    res.status(200).json({
        msg: 'GET - controller'
    });
}

const createUser = (req, res = response) => {
    const body = req.body;
    res.status(201).json({
        msg: 'POST - controller',
        body
    });
}

const updatePutUser = (req, res = response) => {
    res.status(400).json({
        msg: 'PUT - controller'
    });
}

const updatePatchUser = (req, res = response) => {
    res.status(200).json({
        msg: 'PATCH - controller'
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