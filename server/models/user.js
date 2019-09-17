var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: { type: String },
    age: { type: Number },
    email: { type: String },
    password: { type: Number },
    posts: { type: Schema.Types.ObjectId, ref: 'Post'}
});

module.exports = mongoose.model('users', userSchema);