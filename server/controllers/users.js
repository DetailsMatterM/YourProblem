var express = require('express');
var router = express.Router();
var User = require('../models/user');

//Return a list of users 
router.get('/', function (req, res, next) {
    User.find(function (err, users) {
        if (err) { return next(err); }
        res.json({ 'users': users });
    });
});

//Creates a new user
router.post('/', function (req, res, next) {
    var user = new User(req.body);
    user.save(function (err) {
        if (err) { return next(err); }
        res.status(201).json(user);
    });
});

//Returns the user with given id
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, user) {
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found'});
        }
        res.json(user);
    });
});

//Deletes a user with the given id
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    User.findOneAndDelete({_id: id}, function(err, user) {
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found'});
        }
        res.json(user);
    });
});

//Replaces a user with the given id
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    User.find({_id: id}, function(err, user) {
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found'});
        }
        res.json(user);
    });
});
module.exports = router;

//Update a users values by id
router.patch('/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, user) {
        if(err) { return next(err); }
        if (user == null) {
            return res.status(404).json({"message": "User not found"});
        }
        user.username = (req.body.username || user.username);
        user.age = (req.body.age || user.age);
        user.email = (req.body.email || user.email);
        user.password = (req.body.password || user.password);
        user.save();
        res.json(user);
    });  
});