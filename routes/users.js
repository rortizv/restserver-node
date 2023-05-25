const { Router } = require('express');
const { getUsers, 
        createUser, 
        updatePutUser, 
        updatePatchUser, 
        deleteUser } = require('../controllers/users');

const router = Router();


router.get('/', getUsers);

router.post('/', createUser);

router.put('/:id', updatePutUser);

router.patch('/:id', updatePatchUser);

router.delete('/', deleteUser);

module.exports = router;