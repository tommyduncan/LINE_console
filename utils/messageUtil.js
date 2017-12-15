const request = require('request');
const config = require('../configs/general.config')
const api = require('../configs/api.config')


var push = function (target, messageObject, callback) {
    var requestBody = {
        "to": target,
        "messages": messageObject
    };

    request(
        {
            url: api.LINE.message.push,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + config.LINE.message.channelAccessToken
            },
            method: 'POST',
            body: JSON.stringify(requestBody)
        },
        function (error, response, body) {
            if (error)
                callback(error, null);
            else if (response.body.error)
                callback(response.body.error, null);
            else
                callback(null, body);
        }
    );
}

var multicast = function (targets, messageObject, callback) {
    var requestBody = {
        "to": targets,
        "messages": messageObject
    };

    request(
        {
            url: api.LINE.message.multicast,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + config.LINE.message.channelAccessToken
            },
            method: 'POST',
            body: JSON.stringify(requestBody)
        },
        function (error, response, body) {
            if (error)
                callback(error, null);
            else if (response.body.error)
                callback(response.body.error, null);
            else
                callback(null, body);
        }
    );
}

module.exports = {
    push: push,
    multicast: multicast/*,
    reply: reply*/
};