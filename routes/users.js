const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { isValidRole, emailExists, idExists } = require('../helpers/db-validators');
const { getUsers,
        createUser,
        updatePutUser,
        updatePatchUser,
        deleteUser } = require('../controllers/users');

const router = Router();


router.get('/', getUsers);

router.post('/', [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is not valid').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }).not(),
        check('password', 'Password is required').not().isEmpty(),
        check('role').custom(isValidRole),
        check('email').custom(emailExists),
        validateFields
], createUser);

router.put('/:id', [
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(idExists),
        check('role').custom(isValidRole),
        validateFields
], updatePutUser);

router.patch('/:id', updatePatchUser);

router.delete('/:id', [
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(idExists),
        validateFields
], deleteUser);

module.exports = router;