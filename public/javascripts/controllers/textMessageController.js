angular.module('LINE_console').controller('TextMessageController', function($scope, MessageService){
    $scope.sendMessage = function(){
        MessageService.sendTextMessage($scope.textContent, function(data){
            console.log(data);
            $scope.textContent = '';
        });
    };
});