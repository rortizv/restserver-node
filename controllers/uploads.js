const { response } = require('express');
const { uploadFile } = require('../helpers/upload-file');
const { User, Product } = require('../models');


const uploadMyFile = async (req, res = response) => {
    try {
        const fileName = await uploadFile(req.files, ['png', 'jpg', 'jpeg', 'gif'], 'images');
        res.json({
            fileName
        });
    } catch (error) {
        res.status(400).json({
            msg: error
        });
    }
}

const updateImage = async (req, res = response) => {
    
        const { id, collection } = req.params;

        let model;

        switch (collection) {
            case 'users':
                model = await User.findById(id);
                if (!model) {
                    return res.status(400).json({
                        msg: `There is no user with id ${id}`
                    });
                }
                break;
            case 'products':
                model = Product.findById(id);
                if (!model) {
                    return res.status(400).json({
                        msg: `There is no product with id ${id}`
                    });
                }
                break;
            
            default:
                return res.status(500).json({
                    msg: 'I forgot to validate this'
                });
        }

        model.img = await uploadFile(req.files, undefined, collection);
        await model.save();

        res.json({
            model
        });
}

module.exports = {
    uploadMyFile,
    updateImage
}