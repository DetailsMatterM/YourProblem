var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Posts = require('./post').schema

var roomSchema = new Schema({
    name: {type: String},
    users: [{ type: Schema.Types.ObjectId, ref: 'users'}],
    posts: [Posts]
});

module.exports = mongoose.model('room', roomSchema);