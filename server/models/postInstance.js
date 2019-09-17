var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postInstanceSchema = new Schema({
    post: { type: Schema.Types.ObjectId, ref: 'post', required: true},
    timeStamp: { type: Date}
});

module.exports = mongoose.model('postInstances', postInstanceSchema);