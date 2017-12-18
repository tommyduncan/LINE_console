var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LineEventLog = new Schema({
    evenType: { type: String, required: true },
    sourceType: { type: String, required: true },
    userId: { type: String, required: true },
    eventReferenceId: {type: Schema.Types.ObjectId, ref: 'MessageLogs'}, 
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LineEventLogs', LineEventLog, 'LineEventLogs');