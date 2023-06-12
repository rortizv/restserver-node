const { response } = require('express');
const { uploadFile } = require('../helpers/upload-file');


const uploadMyFile = async (req, res = response) => {
    
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file_uploaded) {
        res.status(400).json({
            msg: 'No files were uploaded.'
        });
        return;
    }

    try {
        const fileName = await uploadFile(req.files, ['txt', 'md'], 'texts');
        res.json({
            fileName
        });
    } catch (error) {
        res.status(400).json({
            msg: error
        });
    }

}

module.exports = {
    uploadMyFile
}