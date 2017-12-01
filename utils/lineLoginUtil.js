var request = require('request');
var config = require('../configs/general.config');
var api = require('../configs/api.config');

var getAccessToken = function (code, callback) {
    var requestBody = {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: config.baseUrl + '/users/validate',
        client_id: config.LINE.login.channelId,
        client_secret: config.LINE.login.channelSecret
    };

    request(
        {
            url: api.LINE.login.getAccessToken,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            method: 'POST',
            form: requestBody
        },
        function (error, response, body) {
            if (error)
                callback(error, null);
            else if (response.body.error)
                callback(response.body.error, null);
            else
                callback(null, JSON.parse(body));
        }
    );
}

var getUserProfiles = function (accessToken, callback) {
    request(
        {
            url: api.LINE.login.getUserProfiles,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            method: 'GET'
        },
        function (error, response, body) {
            if (error)
                callback(error, null);
            else if (response.body.error)
                callback(response.body.error, null);
            else
                callback(null, JSON.parse(body));
        }
    );
}

module.exports = {
    getAccessToken: getAccessToken,
    getUserProfiles: getUserProfiles
};