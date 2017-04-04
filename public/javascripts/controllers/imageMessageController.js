angular.module('LINE_console').controller('ImageMessageController', function ($scope, $http, MessageService, FileService) {
    var regex = /^[a-zA-Z0-9-_.]+$/;

    $scope.sendImageMessage = function () {
        var file = $scope.myFile;
        var fd = new FormData();
        fd.append('image', file);

        if (regex.test(file.name)) {
            FileService.uploadImage(fd, function (data) {
                MessageService.sendImageMessage(file.name, function (data) {
                    console.log(data);
                });
            });
        }
        else {
            $scope.errorMessage = '檔名不符合格式！';
        }
    };
});