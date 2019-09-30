var express = require('express');
var router = express.Router();
var ComplaintsRoom = require('../models/complaintsRoom');
var Post = require('../models/post');

// Return a list of all complaintRooms
router.get('/', function (req, res, next) {
    ComplaintsRoom.find(function (err, complaintsRooms) {
        if (err) { return next(err); }
        if (complaintsRooms.length == 0) { return res.status(404).json({ 'message': 'rooms not found' }); }
        res.json({ 'complaintsRooms': complaintsRooms });
    });
});

// Create a new complaintsRooms
router.post('/', function (req, res, next) {
    var complaintsRoom = new ComplaintsRoom(req.body);
    complaintsRoom.save(function (err) {
        if (err) { return next(err); }
        res.status(201).json(complaintsRoom);
    });
});

// Return the Room with the given ID
router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    ComplaintsRoom.findById(id, function (err, complaintsRoom) {
        if (err) { return next(err); }
        if (complaintsRoom === null) {
            return res.status(404).json({ 'message': 'Room not found' });
        }
        res.json(complaintsRoom);
    });
});

// Delete the Rooms with the given ID
router.delete('/:id', function (req, res, next) {
    var id = req.params.id;
    ComplaintsRoom.findOneAndDelete({ _id: id }, function (err, complaintsRoom) {
        if (err) { return next(err); }
        if (complaintsRoom === null) {
            return res.status(404).json({ 'message': 'Room not found' });
        }
        res.json(complaintsRoom);
    });
});

//Delete all rooms
router.delete('/', function (req, res, next) {
    ComplaintsRoom.deleteMany({}, function (err, complaintsRoom) {
        if (err) { return next(err); }
        if (complaintsRoom === null) {
            return res.status(404).json({ 'message': 'Rooms not found' });
        }
        res.json(complaintsRoom);
    });
});

//Replaces a room with the given id
router.put('/:id', function (req, res, next) {
    var id = req.params.id;
    ComplaintsRoom.replaceOne({ _id: id }, { changed: req.body.changed, description: req.body.description }, function (err, complaintsRoom) {
        if (err) { return next(err); }
        if (complaintsRoom === null) {
            return res.status(404).json({ 'message': 'Room not found' });
        }
        res.json(complaintsRoom);
    });
});

//Update a complaintsrooms values by id
router.patch('/:id', function (req, res, next) {
    var id = req.params.id;
    ComplaintsRoom.findById(id, function (err, user) {
        if (err) { return next(err); }
        if (complaintsRoom == null) {
            return res.status(404).json({ "message": "Room not found" });
        }
        complaintsRoom.maxUsers = (req.body.maxUsers || post.maxUsers);
        complaintsRoom.save();
        res.json(complaintsRoom);
    });
});

//create a new post  
router.post('/:id', function (req, res, next) {
    var id = req.params.id;
    var post = new Post(req.body);
    ComplaintsRoom.findById(id, function (err, foundRoom) {
        console.log(foundRoom);
        if (foundRoom == null) {
            return res.status(404).json({ "message": "Room not found" });
        }
        if (err) { return next(err); }
        post.save(function (err, savedPost) {
            if (err) return err;
            foundRoom.posts.push(savedPost._id);
            foundRoom.save();
        });
        res.json(post);
    });
});
module.exports = router;

