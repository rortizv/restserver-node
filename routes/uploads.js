const { Router } = require('express');
const { check } = require('express-validator');

const { uploadMyFile, updateImage } = require('../controllers/uploads');
const { validateFields, validateUploadFile } = require('../middlewares');
const { allowedCollections } = require('../helpers/db-validators');

const router = Router();

router.post('/', validateUploadFile, uploadMyFile);

router.put('/:collection/:id', [
    validateUploadFile,
    check('id', 'The id must be a Mongo ID').isMongoId(),
    check('collection').custom(coll => allowedCollections(coll, ['users', 'products'])),
    validateFields
], updateImage);

module.exports = router;