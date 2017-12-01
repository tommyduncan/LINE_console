angular.module('bind_app').controller('IndexController', function ($scope, $state, $location, $ionicPopup, MemberService) {
    $scope.memberData = {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        lineId: ''
    }

    initial();

    $scope.bind = function () {
        if (validateFormData()) {
            MemberService.bindMember($scope.memberData, (data) => {
                console.log(data);

                if (data.status === 1) {
                    $ionicPopup.alert({
                        title: '恭喜您',
                        template: '綁定成功！！',
                        okText: '確定'
                    }).then((res) => {
                        $state.go('done');
                    });
                } else {
                    $ionicPopup.alert({
                        title: '錯誤！',
                        template: '請稍後再試。'
                    });
                }
            });
        }
    };

    function initial() {
        /* 檢查使用者是否已綁定過 */
        MemberService.checkDuplicateMember((data) => {
            if (data.status === 1)
            $ionicPopup.alert({
                title: '提醒！',
                template: '您已經加入過會員！！',
                okText: '確定'
            }).then((res) => {
                $state.go('done');
            });
        });
    }

    function validateFormData() {
        if ($scope.memberData.lastName == '') {
            alert("請填寫姓氏");

            return false;
        }
        if ($scope.memberData.firstName == '') {
            alert("請填寫名字");

            return false;
        }
        if ($scope.memberData.phone == '') {
            alert("請填寫手機");

            return false;
        }
        if ($scope.memberData.email == '') {
            alert("請填寫電子信箱");

            return false;
        }
        if ($scope.memberData.lineId == '') {
            alert("請填寫Line ID");

            return false;
        }
        return true;
    }
});