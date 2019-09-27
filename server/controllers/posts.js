var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var User = require('../models/user');

//Return all posts
router.get('/', function (req, res, next) {
    Post.find(function (err, posts) {
        if (err) { return next(err); }
        if (posts.length == 0) { return res.status(404).json({ 'message': 'Posts not found' }); }
        res.json({ 'posts': posts });
    });
});


//Return all posts reversed
router.get('/sorted', function (req, res, next) {
    Post.find(function (err, posts) {
        if (err) { return next(err); }
        posts.reverse();
        res.json({ 'posts': posts });
    });
});

//create a new post 
router.post('/', function (req, res, next) {
    var post = new Post(req.body);
    id = req.params.id;
    post.save(function (err) {
        if (err) {
            return next(err);
        }
        res.status(201).json(post);
    });
});

//Returns the post with given id
router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    Post.findById(id, function (err, post) {
        if (err) { return next(err); }
        if (post === null) {
            return res.status(404).json({ 'message': 'Post not found' });
        }
        res.json(post);
    });
});

//Delete all posts
router.delete('/', function (req, res, next) {
    Post.deleteMany({}, function (err, post) {
        if (err) { return next(err); }
        if (post === null) {
            return res.status(404).json({ 'message': 'Posts not found' });
        }
        res.json(post);
    });
});

//Deletes a post with the given id
router.delete('/:id', function (req, res, next) {
    var id = req.params.id;
    Post.findOneAndDelete({ _id: id }, function (err, post) {
        if (err) { return next(err); }
        if (post === null) {
            return res.status(404).json({ 'message': 'Post not found' });
        }
        res.json(post);
    });
});

//Replaces a post with the given id
router.put('/:id', function (req, res, next) {
    var id = req.params.id;
    Post.replaceOne({ _id: id }, function (err, post) {
        if (err) { return next(err); }
        if (post === null) {
            return res.status(404).json({ 'message': 'Post not found' });
        }
        res.json(post);
    });
});

//Update a posts values by id
router.patch('/:id', function (req, res, next) {
    var id = req.params.id;
    Post.findById(id, function (err, user) {
        if (err) { return next(err); }
        if (post == null) {
            return res.status(404).json({ "message": "Post not found" });
        }
        post.title = (req.body.title || post.title);
        post.text = (req.body.text || user.text);
        post.save();
        res.json(post);
    });
});


module.exports = router;


