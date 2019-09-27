var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var achievementSchema = new Schema({
    name: { type: String },
    description: { type: String }
});

module.exports = mongoose.model('achievements', achievementSchema);
