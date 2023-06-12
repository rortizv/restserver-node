const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const { uploadMyFile } = require('../controllers/uploads');

const router = Router();

router.post('/', uploadMyFile);

module.exports = router;