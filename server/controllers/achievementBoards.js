var express = require('express');
var router = express.Router();
var AchievementBoard = require('../models/achievementBoard');

// Return a list of all achievementBoards
router.get('/', function (req, res, next) {
    AchievementBoard.find(function (err, achievementBoards) {
        if (err) { return next(err); }
        if (achievementBoards.length == 0) { return res.status(404).json({ 'message': 'Boards not found' }); }
        res.json({ 'achievementsBoards': achievementBoards });
    });
});

// Create a new achievementBoard
router.post('/', function (req, res, next) {
    var achievementBoard = new AchievementBoard(req.body);
    achievementBoard.save(function (err) {
        if (err) { return next(err); }
        res.status(201).json(achievementBoard);
    });
});

// Return the achievementBoard with the given ID
router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    AchievementBoard.findById(id, function (err, achievementBoard) {
        if (err) { return next(err); }
        if (achievementBoard === null) {
            return res.status(404).json({ 'message': 'Board not found' });
        }
        res.json(achievementBoard);
    });
});

// Delete the achievementBoard with the given ID
router.delete('/:id', function (req, res, next) {
    var id = req.params.id;
    AchievementBoard.findOneAndDelete({ _id: id }, function (err, achievementBoard) {
        if (err) { return next(err); }
        if (achievementBoard === null) {
            return res.status(404).json({ 'message': 'Board not found' });
        }
        res.json(achievementBoard);
    });
});


//Replaces an achievement board with the given id
router.put('/:id', function (req, res, next) {
    var id = req.params.id;
    AchievementBoard.replaceOne({ _id: id }, { changed: req.body.changed, description: req.body.description }, function (err, achievementBoard) {
        if (err) { return next(err); }
        if (achievementBoard === null) {
            return res.status(404).json({ 'message': 'Achievement Board not found' });
        }
        res.json(achievementBoard);
    });
});

module.exports = router;
