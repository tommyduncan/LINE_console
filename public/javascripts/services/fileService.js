angular.module('LINE_console').service('FileService', function ($http) {
    this.uploadImage = function (fd, onSuccess) {
        $http.post('/upload/', fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).then(function (data, status, headers, config) {
            (onSuccess || angular.noop)(data);
        }, function (data, status, headers, config) {
            console.log("Error Data:" + data);
            console.log('Status: ' + status);
            console.log('Headers: ' + headers);
            console.log('Config: ' + config);
        });
    }
});