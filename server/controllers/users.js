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

router.post('/', function (req, res, next) {
    var user = new User(req.body);
    user.save(function (err) {
        if (err) { return next(err); }
        res.status(201).json(user);
    });


});

module.exports = router;