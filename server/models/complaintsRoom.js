var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var compaintsRoomSchema = new Schema({
    users: [{ type: Schema.Types.ObjectId, ref: 'user'}],
    maxUsers: {type: Number},
    userCount: {type: Number},
});

module.exports = mongoose.model('complaintsRoom', compaintsRoomSchema);