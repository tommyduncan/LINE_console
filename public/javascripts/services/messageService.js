angular.module('LINE_console').service('MessageService', function ($http) {
    this.multicastMessages = function (messageObject, onSuccess) {
        $http.post('/messages/multicast', messageObject)
            .then(function successCallback(response, status, headers, config) {
                (onSuccess || angular.noop)(response);
            }, function errorCallback(response) {
                console.log("Error Data:" + response);
            });
    };

    /*this.sendTextMessage = function (textContent, onSuccess) {
        var textObject = {
            text: textContent
        };

        $http.post('/messages/sendTextMessage', textObject)
            .then(function (data, status, headers, config) {
                (onSuccess || angular.noop)(data);
            },
            function (data, status, headers, config) {
                console.log("Error Data:" + data);
                console.log('Status: ' + status);
                console.log('Headers: ' + headers);
                console.log('Config: ' + config);
            });
    };*/

    this.sendImageMessage = function (imageName, onSuccess) {
        var imageObject = {
            imageName: imageName
        };

        $http.post('/messages/sendImageMessage', imageObject)
            .then(function (data, status, headers, config) {
                (onSuccess || angular.noop)(data);
            },
            function (data, status, headers, config) {
                console.log("Error Data:" + data);
                console.log('Status: ' + status);
                console.log('Headers: ' + headers);
                console.log('Config: ' + config);
            });
    };
});