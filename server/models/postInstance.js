var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postInstanceSchema = new Schema({
    post: { type: Schema.Types.ObjectId, ref: 'posts' },
    timeStamp: { type: String }
});

module.exports = mongoose.model('postInstances', postInstanceSchema);