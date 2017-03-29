angular.module('LINE_console').service('MessageService', function ($http) {
    this.sendTextMessage = function (textContent, onSuccess) {
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
    };
});