angular.module('LINE_console').service('FileService', function ($http) {
    this.uploadImage = function (file, onSuccess) {
        var fd = new FormData();

        fd.append('image', file);

        $http.post('/upload/', fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).then(function (body, status, headers, config) {
            (onSuccess || angular.noop)(body.data);
        }, function (data, status, headers, config) {
            console.log("Error Data:" + data);
            console.log('Status: ' + status);
            console.log('Headers: ' + headers);
            console.log('Config: ' + config);
        });
    }
});