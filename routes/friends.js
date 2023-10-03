const router = require('express').Router();
// const validation = require('../middleware/validate')

const friendsController = require('../controllers/friends');

const { isAuthenticated } = require('../middleware/authenticate')

router.get('/', friendsController.getAll);
router.get('/:id', friendsController.getSingle);
router.post('/', isAuthenticated, friendsController.createFriend);
router.put('/:id', isAuthenticated ,friendsController.updateFriend);
router.delete('/:id',isAuthenticated, friendsController.deleteFriend);

module.exports = router;