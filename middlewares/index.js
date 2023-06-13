const validateFields = require('./validate-fields');
const validateJWT = require('./validate-jwt');
const validateRoles = require('./validate-roles');
const validateUploadFile = require('./validate-files');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRoles,
    ...validateUploadFile
}