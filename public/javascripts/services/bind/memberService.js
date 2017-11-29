angular.module('bind_app').service('MemberService', function ($http) {
    this.bindMember = function (memberData, onSuccess) {
        $http.post('/member/', memberData)
            .then(function (data, status, headers, config) {
                (onSuccess || angular.noop)(data);
            },
            function (data, status, headers, config) {
                console.log("Error Data:" + data);
                console.log('Status: ' + status);
                console.log('Headers: ' + headers);
                console.log('Config: ' + config);
            });
    }
});