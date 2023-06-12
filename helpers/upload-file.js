const path = require('path'); 
const { v4: uuidv4 } = require('uuid');


const uploadFile = async (files, validExtensions = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {

    return new Promise ((resolve, reject) => {
        const { file_uploaded } = files;
        const splittedName = file_uploaded.name.split('.');
        const extension = splittedName[splittedName.length - 1];
    
        // Validate extension
        if (!validExtensions.includes(extension)) {
            return reject(`Extension ${extension} is not allowed. Valid extensions are: ${validExtensions}`);
        }
    
        const tempName = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', folder, tempName);
    
        file_uploaded.mv(uploadPath, function (err) {
            if (err) {
                reject(err);
            }
    
            resolve(tempName);
        });
    });
}

module.exports = {
    uploadFile
}