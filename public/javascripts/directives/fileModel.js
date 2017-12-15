angular.module('LINE_console').directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var isMultiple = attrs.multiple;
            var modelSetter = model.assign;

            element.bind('change', function () {
                var files = [];

                angular.forEach(element[0].files, function (item) {
                    var file = {
                        name: item.name,
                        size: item.size,
                        url: URL.createObjectURL(item),
                        _file: item
                    };
                    files.push(file);
                });

                scope.$apply(function () {
                    if (isMultiple)
                        modelSetter(scope, files);
                    else
                        modelSetter(scope, files[0]);
                });
            });
        }
    };
}]);