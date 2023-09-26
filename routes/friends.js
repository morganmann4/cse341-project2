const express = require('express');
const router = express.Router();

const friendsController = require('../controllers/friends');

router.get('/', friendsController.getAll);

router.get('/:id', friendsController.getSingle);

router.post('/', friendsController.createFriend);

router.put('/:id', friendsController.updateFriend);

router.delete('/:id', friendsController.deleteFriend);

module.exports = router;