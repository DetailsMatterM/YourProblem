var express = require('express');
var router = express.Router();
var Achievement = require('../models/achievement');

// Return a list of all achievements
router.get('/', function (req, res, next) {
    Achievement.find(function (err, achievements) {
        if (err) { return next(err); }
        res.json({ 'achievements': achievements });
    });
});

// Create a new achievement
router.post('/', function (req, res, next) {
    var achievement = new Achievement(req.body);
    achievement.save(function (err) {
        if (err) { return next(err); }
        res.status(201).json(achievement);
    });
});

router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    Achievement.findById(id, function (err, achievement) {
        if (err) { return next(err); }
        if (achievement === null) {
            return res.status(404).json({ 'message': 'Achievement not found' })
        }
        res.json(achievement);
    });
});

//Replaces an achievement with the given id
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    Achievement.replaceOne({_id: id}, function(err, achievement) {
        if (err) { return next(err); }
        if (achievement === null) {
            return res.status(404).json({'message': 'Achievement not found'});
        }
        res.json(achievement);
    });
});

module.exports = router;

//Update an achievments values by id
router.patch('/:id', function(req, res, next) {
    var id = req.params.id;
    Achievement.findById(id, function(err, user) {
        if(err) { return next(err); }
        if (achievement == null) {
            return res.status(404).json({"message": "Achievement not found"});
        }
        achievement.name = (req.body.name || post.name);
        achievement.description = (req.body.description || user.description);
        achievement.save();
        res.json(achievement);
    });  
});