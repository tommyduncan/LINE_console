var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SendMessage = new Schema({
    target: { type: String, required: true },
    messages: [Schema.Types.Mixed],
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SendMessages', SendMessage, 'SendMessages');