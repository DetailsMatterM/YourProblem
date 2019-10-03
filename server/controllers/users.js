var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Post = require('../models/post');

//Return a list of users 
router.get('/', function (req, res, next) {
    User.find(function (err, users) {
        if (err) { return next(err); }
        if (users.length == 0) { return res.status(404).json({ 'message': 'Users not found' }); }
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
router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    User.findById(id, function (err, user) {
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({ 'message': 'User not found' });
        }
        res.json(user);
    });
});
//returns all posts
router.get('/:id/posts', function (req, res, next) {
    var id = req.params.id;
    User.findById(id, function (err, user) {
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({ 'message': 'User post not found' });
        }
        Post.find(function (err, posts) {
            if (err) { return next(err); }
            res.json({ 'posts': posts });
        });
    });

});

//Returns one post of a user  by id
router.get('/:id/posts/:id', function (req, res, next) {
    var id = req.params.id;
    Post.findById(id, function (err, post) {
        if (err) { return next(err); }
        if (post === null) {
            return res.status(404).json({ 'message': 'Post not found' });
        }
        res.json(post);
    });
});

//Delete one post of a user by id
router.delete('/:id/posts/:id', function (req, res, next) {
    var id = req.params.id;
    Post.findById(id, function (err, post) {
        if (err) { return next(err); }
        if (post === null) {
            return res.status(404).json({ 'message': 'Post not found' });
        }
        res.json({ 'message': 'post deleted' });
        post.delete();
    });
});

//Deletes a user with the given id
router.delete('/:id', function (req, res, next) {
    var id = req.params.id;
    User.findOneAndDelete({ _id: id }, function (err, user) {
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({ 'message': 'User not found' });
        }
        res.json(user);
    });
});

//Update a users values by id
router.patch('/:id', function (req, res, next) {
    var id = req.params.id;
    User.findById(id, function (err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({ "message": "User not found" });
        }
        user.username = (req.body.username || user.username);
        user.age = (req.body.age || user.age);
        user.email = (req.body.email || user.email);
        user.password = (req.body.password || user.password);
        user.save();
        res.json(user);
    });
});

//create a new post  
router.post('/:id', function (req, res, next) {
    var id = req.params.id;
    var post = new Post(req.body);
    User.findById(id, function (err, foundUser) {
        console.log(foundUser);
        if (foundUser == null) {
            return res.status(404).json({ "message": "User not found" });
        }
        if (err) { return next(err); }
        post.save(function (err, savedPost) {
            if (err) return err;
            foundUser.posts.push(savedPost._id);
            foundUser.save();
        });
        res.json(post);
    });
});

module.exports = router;

