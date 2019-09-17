var express = require('express');
var router = express.Router();
var PostInstance = require('../models/postInstance');

// return a list of all postInstances
router.get('/', function(req, res, next) {
    PostInstance.find(function(err, postInstances) {
        if (err) {return next(err); }
        res.json({'postInstances': postInstances});
    });
});

// create a new postInstance
router.post('/', function(req, res, next) {
    var postInstance = new PostInstance(req.body);
    postInstance.save(function(err) {
        if (err) {return next(err); }
        res.status(201).json(postInstance);
    });
});

// Return the postInstance with the given ID
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    PostInstance.findById(id, function(err, postInstance) {
        if (err) { return next(err); }
        if (postInstance === null) {
            return res.status(404).json({'message': 'PostInstance not found'});
        }
        res.json(postInstance);
    });
});

// Delete the PostInstance with the given ID
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    PostInstance.findOneAndDelete({_id: id}, function(err, postInstance) {
        if (err) { return next(err); }
        if (postInstance === null) {
            return res.status(404).json({'message': 'PostInstance not found'});
        }
        res.json(postInstance);
    });
});

//Replaces a PostInstance with the given id
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    PostInstance.replaceOne({_id: id}, function(err, postInstance) {
        if (err) { return next(err); }
        if (postInstance === null) {
            return res.status(404).json({'message': 'PostInstance not found'});
        }
        res.json(postInstance);
    });
});

module.exports = router;
