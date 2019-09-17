var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    title: { type: String },
    text: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true}
});

module.exports = mongoose.model('posts', postSchema);