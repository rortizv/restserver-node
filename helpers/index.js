const dvValidators = require('./dvValidators');
const generateJWT = require('./generateJWT');
const googleVerify = require('./googleVerify');
const uploadFile = require('./uploadFile');

module.exports = {
    ...dvValidators,
    ...generateJWT,
    ...googleVerify,
    ...uploadFile
}