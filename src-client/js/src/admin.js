var app = angular.module('App', ['ngMaterial', 'md.data.table']); // jshint ignore:line

// Syntax changed to prevent conflicts with jinja2
app.config(['$interpolateProvider', function($interpolateProvider){
    $interpolateProvider.startSymbol('{[');
    $interpolateProvider.endSymbol(']}');
}]);

// The ng-model is does not support file inputs, so we create our own
app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

// Populate input fields if value is set
app.directive('input', ['$parse', function ($parse) {
    return {
        restrict: 'E',
        require: '?ngModel',
        link: function (scope, element, attrs) {
            if(attrs.value && attrs.value !== 'None' && attrs.type !== "file") {
                $parse(attrs.ngModel).assign(scope, attrs.value);
            }
        }
    };
}]);

// List controller
app.controller('AppCtrl', function($scope, $log, $http, $filter, $mdSidenav, $mdDialog) {
    // pathname without the inital forward slash
    var pathname = window.location.pathname.substring(1)

    // Simple replacement method of links
    $scope.clearFlashMessage = function(index) {
        $scope.flashMessages.splice(index, 1);
    }

    $scope.records = [];
    $scope.selected = [];

    $scope.openNav = function() {
        $mdSidenav('left').toggle();
    };

    $scope.openForm = function(event, index) {
        event.stopPropagation();

        $scope.formData = {};
        if (index !== undefined) {
            $scope.formData = $scope.records.data[index];
        }
        $mdSidenav('right').toggle();
    };

    $scope.closeForm = function() {
        $mdSidenav('right').toggle();
    };

    $scope.options = {
        autoSelect: true,
        boundaryLinks: false,
        largeEditDialog: false,
        pageSelector: false,
        rowSelection: true
    };

    // Set pagination settings
    $scope.query = {
        order: 'user_defined_order',
        limit: 10,
        page: 1
    };

    $scope.fetchItems = function() {
        $scope.records = [];
        // Fetch all active records
        $http.get('/api/records').
            success(function(results) {
                $scope.records = results;
            }).
            error(function(error) {
                $log.log(error);
            });
    };

    $scope.fetchItems();

    $scope.deleteSelected = function() {
        url_parts = ['/api', pathname, _id, 'delete']
        var deleteUrl = url_parts.join('/');

        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Delete item')
            .content('Are you sure you want to remove the selected item(s)?')
            .ariaLabel('Delete item')
            .ok('Delete')
            .cancel('Cancel')
            .clickOutsideToClose(true);

        $mdDialog.show(confirm).then(function() {
            angular.forEach($scope.selected, function(item) {   // jshint ignore:line
                // Remove item from backend
                $http.get(deleteUrl).
                    success(function() {
                        $scope.flashMessages.push([
                            'Items deleted',
                            'success'
                        ]);
                    }).
                    error(function(error) {
                        $scope.flashMessages.push([
                            'Failed to remove items, please try again.',
                            'warning'
                        ]);
                    });
            });
            setTimeout(function() {
                $scope.selected = [];
                $scope.fetchItems();
            }, 500);
        });
    };

    // Process a form
    $scope.formData = {};
    $scope.serverErrors = {};
    $scope.submitForm = function(){
        $scope.flashMessages = [];
        var uploadUrl = '/api' + window.location.pathname;

        // Create an empty FormData object to store all form fields
        var fd = new FormData();

        // Loop through all of the image fields, and append them to the FormData object
        for (var key in $scope.imageFields) {
            fd.append(key, $scope.imageFields[key], $scope.imageFields[key]['name']);
        }

        // Loop through all other fields, and append them to the FormData object
        for (var key in $scope.formData) {
            if ($scope.formData[key]) {
                fd.append(key, $scope.formData[key]);
            }
        }

        // Send the data of to the api, to be stored by the server
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(result){
            if (result['data'] == false) {
                $scope.flashMessages.push(['Form Saved', 'success']);
            } else {
                window.location.href = result['data'];
            }
        })
        .error(function(error, status){
            var scroll_to_first = true;
            var error_message = 'Something went wrong, please try again.'
            if (error['message']) {
                error_message = error['message'];
            } else if (error['error']) {
                error_message = error['error'];
            }
            $scope.flashMessages.push([error_message, 'warning']);
            for (var key in error['data']) {
                $scope.serverErrors[key] = error['data'][key];

                if (scroll_to_first == true) {
                    scroll_to_first = false;
                    $location.hash(key);
                    $anchorScroll();
                }
            }
        });
    };

});
