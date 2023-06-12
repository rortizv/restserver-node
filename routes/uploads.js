const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const { uploadFile } = require('../controllers/uploads');

const router = Router();

router.post('/', uploadFile);

module.exports = router;