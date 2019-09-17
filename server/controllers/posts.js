var express = require('express');
var router = express.Router();
var Post = require('../models/post');

router.get('/', function (req, res, next) {
    Post.find(function (err, posts) {
        if (err) { return next(err); }
        res.json({ 'posts': posts });
    });
});

//create a new post 
router.post('/', function (req, res, next) {
    var post = new Post(req.body);
    post.save(function (err) {

        if (err) {
            return next(err);
        }
        res.status(201).json(post);
    });
});

//Returns the post with given id
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Post.findById(id, function(err, post) {
        if (err) { return next(err); }
        if (post === null) {
            return res.status(404).json({'message': 'Post not found'});
        }
        res.json(post);
    });
});

//Deletes a post with the given id
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Post.findOneAndDelete({_id: id}, function(err, post) {
        if (err) { return next(err); }
        if (post === null) {
            return res.status(404).json({'message': 'Post not found'});
        }
        res.json(post);
    });
});

//Replaces a post with the given id
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    Post.replaceOne({_id: id}, function(err, post) {
        if (err) { return next(err); }
        if (post === null) {
            return res.status(404).json({'message': 'Post not found'});
        }
        res.json(post);
    });
});

module.exports = router;