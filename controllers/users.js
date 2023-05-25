const { response } = require('express');


const getUsers = (req, res = response) => {
    const queryParams = req.query;
    res.status(200).json({
        msg: 'GET - controller',
        queryParams
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