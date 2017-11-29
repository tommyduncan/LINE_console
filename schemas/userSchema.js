var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var options = {
    errorMessages: {
        MissingPasswordError: 'No password was given.',
        AttemptTooSoonError: 'Account is currently locked. Try again later.',
        TooManyAttemptsError: 'Account locked due to too many failed login attempts.',
        NoSaltValueStoredError: 'Authentication not possible. No salt value stored.',
        IncorrectPasswordError: 'Password or username are incorrect.',
        IncorrectUsernameError: 'Password or username are incorrect.',
        MissingUsernameError: 'No username was given.',
        UserExistsError: 'A user with the given username is already registered.'
    }
};

var User = new Schema({});

User.plugin(passportLocalMongoose, options.errorMessages);

module.exports = mongoose.model('Users', User, "Users");