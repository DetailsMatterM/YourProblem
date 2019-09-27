var express = require('express');
var router = express.Router();
var Admin = require('../models/admin');

// Return a list of all admins
router.get('/', function (req, res, next) {
    Admin.find(function (err, admins) {
        if (err) { return next(err); }
        if (admins.length == 0) { return res.status(404).json({ 'message': 'Admins not found' }); }
        res.json({ 'admins': admins });
    });
});

// Create a new admin
router.post('/', function (req, res, next) {
    var admin = new Admin(req.body);
    admin.save(function (err) {
        if (err) {
            return next(err);
        }
        res.status(201).json(admin);
    });
});

//Delete the admin with the given ID
router.delete('/:id', function (req, res, next) {
    var id = req.params.id;
    Admin.findOneAndDelete({ _id: id }, function (err, admin) {
        if (err) { return next(err); }
        if (admin === null) {
            return res.status(404).json({ 'message': 'Admin not found' });
        }
        res.json(admin);
    });
});

//Replaces an admin with the given id
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    Admin.replaceOne({_id: id}, function(err, admin) {
        if (err) { return next(err); }
        if (admin === null) {
            return res.status(404).json({'message': 'Admin not found'});
        }
        res.json(admin);
    });
});

//Update an admins values by id
router.patch('/:id', function(req, res, next) {
    var id = req.params.id;
    Admin.findById(id, function(err, user) {
        if(err) { return next(err); }
        if (admin == null) {
            return res.status(404).json({"message": "Admin not found"});
        }
        admin.userName = (req.body.userName || post.userName);
        admin.age = (req.body.age || user.age);
        admin.email = (req.body.email || user.email);
        admin.password = (req.body.password || user.password);
        admin.save();
        res.json(admin);
    });  
});

module.exports = router;
