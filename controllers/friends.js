const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Freinds']
    const friendId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db().collection('friends').find();
    result.toArray().then((friends) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(friends);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Friends']
    const friendId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db().collection('friends').find({_id: friendId});
    result.toArray().then((friends) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(friends[0]);
    });
};

const createFriend = async (req, res) => {
    //#swagger.tags=['Friends']
    const friend = {
        age: req.body.age,
        email: req.body.email,
        favoriteNumber: req.body.favoriteNumber,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        occupation: req.body.occupation,
        phoneNumber: req.body.phoneNumber
    };
    const response = await mongodb.getDatabase().db().collection('friends').insertOne(friend);
    if (response.acknowledged > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while creating the friend')
    }
};

const updateFriend = async (req, res) => {
    //#swagger.tags=['Friends']
    const friendId = new ObjectId(req.params.id)
    const friend = {
        age: req.body.age,
        email: req.body.email,
        favoriteNumber: req.body.favoriteNumber,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        occupation: req.body.occupation,
        phoneNumber: req.body.phoneNumber
    };
    const response = await mongodb.getDatabase().db().collection('friends').replaceOne({ _id: friendId }, friend);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the friend')
    }
};

const deleteFriend = async (req, res) => {
    //#swagger.tags=['Friends']
    const friendId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('friends').deleteOne({ _id: friendId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while deleteing the friend')
    }
};

module.exports = {
    getAll,
    getSingle,
    createFriend,
    updateFriend,
    deleteFriend
};