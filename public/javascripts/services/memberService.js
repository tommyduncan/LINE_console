angular.module('LINE_console').service('MemberService', function ($http) {
    this.getMembers = function (onSuccess) {
        $http.get('/member')
            .then(function (result, status, headers, config) {
                (onSuccess || angular.noop)(result.data);
            },
            function (data, status, headers, config) {
                console.log("Error Data:" + data);
                console.log('Status: ' + status);
                console.log('Headers: ' + headers);
                console.log('Config: ' + config);
            });
    }
});