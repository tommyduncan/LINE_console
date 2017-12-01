var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageLog = new Schema({
    messageId: { type: String, required: true },
    messageType: { type: String, required: true },
    messageContent: { type: String, required: false }
});

module.exports = mongoose.model('MessageLogs', MessageLog, 'MessageLogs');