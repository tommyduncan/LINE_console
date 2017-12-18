var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var LineUser = new Schema({
userId: { type: String, required: true },
timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LineUsers', LineUser, 'LineUsers');