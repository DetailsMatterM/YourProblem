var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var achievementBoardSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'user', required: true},
    achievement: [{ type: Schema.Types.ObjectId, ref: 'achievement'}]
});