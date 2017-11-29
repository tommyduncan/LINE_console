var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Member = new Schema({
    userId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: String,
    email: String,
    lineId: String
});

module.exports = mongoose.model('Members', Member, 'Members');