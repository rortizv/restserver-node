const { response } = require('express');
const fs = require('fs');
const path = require('path');
const { uploadFile } = require('../helpers/upload-file');
const { User, Product } = require('../models');


const uploadMyFile = async(req, res = response) => {
    try {        
        // txt, md
        // const name = await uploadFile( req.files, ['txt','md'], 'texts' );
        const name = await uploadFile( req.files, undefined, 'images' );
        res.json({ name });

    } catch (msg) {
        res.status(400).json({ msg });
    }

}

const updateImage = async(req, res = response ) => {
    const { id, collection } = req.params;
    let model;

    switch ( collection ) {
        case 'users':
            model = await User.findById(id);
            if ( !model ) {
                return res.status(400).json({
                    msg: `There is no user with id ${ id }`
                });
            }
        
        break;

        case 'products':
            model = await Product.findById(id);
            if ( !model ) {
                return res.status(400).json({
                    msg: `There is no product with id ${ id }`
                });
            }
        
        break;
    
        default:
            return res.status(500).json({ msg: 'No validation here'});
    }

    // Clean previous images
    if ( model.img ) {
        // Delete image from server
        const imagePath = path.join( __dirname, '../uploads', collection, model.img );
        if ( fs.existsSync( imagePath ) ) {
            fs.unlinkSync( imagePath );
        }
    }

    const name = await uploadFile( req.files, undefined, collection );
    model.img = name;

    await model.save();

    res.json( model );

}


const showImage = async (req, res = response) => {
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
            model = await Product.findById(id);
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

    // Clean previous images
    if (model.img) {
        const imagePath = path.join(__dirname, '../uploads', collection, model.img);
        if (fs.existsSync(imagePath)) {
            return res.sendFile(imagePath);
        }
    }

    res.json({
        msg: 'Missing placeholder'
    });
}

module.exports = {
    uploadMyFile,
    updateImage,
    showImage
}