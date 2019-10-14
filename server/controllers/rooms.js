var express = require('express');
var router = express.Router();
var Room = require('../models/room');
var Post = require('../models/post');

// Return a list of all rooms
router.get('/', function (req, res, next) {
    Room.find(function (err, rooms) {
        if (err) { return next(err); }
        if (rooms.length == 0) { return res.status(404).json({ 'message': 'rooms not found' }); }
        res.json({ 'rooms': rooms });
    });
});

// Create a new room
router.post('/', function (req, res, next) {
    var room = new Room(req.body);
    room.save(function (err) {
        if (err) { return next(err); }
        res.status(201).json(room);
    });
});

// Return the Room with the given ID
router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    Room.findById(id, function (err, room) {
        if (err) { return next(err); }
        if (room === null) {
            return res.status(404).json({ 'message': 'Room not found' });
        }
        res.json(room);
    });
});

// Return a list of all posts in a room
router.get('/:id/posts', function (req, res, next) {
    var id = req.params.id;
    Room.findById(id, function (err, room) {
        if (err) { return next(err); }
        if (room === null) {
            return res.status(404).json({ 'message': 'Room not found' });
        }
        Post.find(function (err, posts) {
            if (err) { return next(err); }
            res.json({ 'posts': posts });
        });
    });
});


//TODO: add return single post


// Delete the Rooms with the given ID
router.delete('/:id', function (req, res, next) {
    var id = req.params.id;
    Room.findOneAndDelete({ _id: id }, function (err, room) {
        if (err) { return next(err); }
        if (room === null) {
            return res.status(404).json({ 'message': 'Room not found' });
        }
        res.json(room);
    });
});

//Delete all rooms
router.delete('/', function (req, res, next) {
    Room.deleteMany({}, function (err, room) {
        if (err) { return next(err); }
        if (room === null) {
            return res.status(404).json({ 'message': 'Rooms not found' });
        }
        res.json(room);
    });
});

//Replaces a room with the given id
router.put('/:id', function (req, res, next) {
    var id = req.params.id;    
    Room.replaceOne({ _id: id }, { name: req.body.name, users: req.body.users, posts: req.body.posts }, function (err, room) {
        if (err) { return next(err); }
        if (room === null) {
            return res.status(404).json({ 'message': 'Room not found' });
        }
        res.json(room);
    });
});

//Update a rooms values by id
router.patch('/:id', function (req, res, next) {
    var id = req.params.id;
    var updatedPosts = req.body;
    Room.findById(id, function (err, foundRoom) {
        if (err) { return next(err); }
        if (foundRoom == null) {
            return res.status(404).json({ "message": "Room not found" });
        }        
        foundRoom.posts = updatedPosts;
        foundRoom.save();
        res.json(foundRoom);
    });
});

//create a new post  
router.post('/:id', function (req, res, next) {
    var id = req.params.id;
    var post = new Post(req.body);
    Room.findById(id, function (err, foundRoom) {
        console.log(foundRoom);
        if (foundRoom == null) {
            return res.status(404).json({ "message": "Room not found" });
        }
        if (err) { return next(err); }
        post.save(function (err, savedPost) {
            if (err) return err;
            foundRoom.posts.push(savedPost);
            foundRoom.save();
        });
        res.json(post);
    });
});
module.exports = router;

