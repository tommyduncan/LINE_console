var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageLog = new Schema({
    messageId: { type: String, required: true },
    messageType: { type: String, required: true },
    messageContent: { type: String, required: true }
});

module.exports = mongoose.model('MessageLogs', MessageLog, 'MessageLogs');