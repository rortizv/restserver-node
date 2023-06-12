const path = require('path'); 

const { response } = require('express');


const uploadFile = async (req, res = response) => {
    
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file_uploaded) {
        res.status(400).json({
            msg: 'No files were uploaded.'
        });
        return;
    }

    const { file_uploaded } = req.files;
    const splittedName = file_uploaded.name.split('.');
    const extension = splittedName[splittedName.length - 1];

    // Validate extension
    const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];
    if (!validExtensions.includes(extension)) {
        return res.status(400).json({
            msg: `Extension ${extension} is not allowed. Valid extensions are: ${validExtensions}`
        });
    }

    res.json({
        msg: 'File uploaded',
        extension
    });

    // uploadPath = path.join(__dirname, '../uploads/', file_uploaded.name);

    // file_uploaded.mv(uploadPath, function (err) {
    //     if (err) {
    //         console.log(err);
    //         return res.status(500).json({err});
    //     }

    //     res.json({ msg: 'File uploaded to ' + uploadPath});
    // });
}

module.exports = {
    uploadFile
}