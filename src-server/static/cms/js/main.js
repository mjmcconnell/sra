var app = angular.module('CMSApp', ['ngMaterial']);

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

// Global controller
app.controller('AppCtrl', function($scope, $http, $filter, $mdSidenav, $mdDialog, $location, $anchorScroll){

    // pathname without the inital forward slash
    var pathname = window.location.pathname.substring(1)

    // Simple replacement method of links
    $scope.clearFlashMessage = function(index) {
        $scope.flashMessages.splice(index, 1);
    }

    // Toggle visibility of the side bar, note button only appears on small screens,
    // where the sidebar is auto-hidden
    $scope.toggleSidenav = toggleSidenav;
    function toggleSidenav(name) {
        $mdSidenav(name).toggle();
    }

    // Displays a prompt to the user, to confirm they want to remove a record
    $scope.removeItem = function(index, _id) {
        // Create the url endpoint path for the delete request
        url_parts = ['/api', pathname, _id, 'delete']
        var deleteUrl = url_parts.join('/');

        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Delete item')
            .content('Are you sure you want to remove this item?')
            .ariaLabel('Delete item')
            .ok('Delete')
            .cancel('Cancel')
            .clickOutsideToClose(true);

        $mdDialog.show(confirm).then(function() {
            // Remove item from backend
            var fd = new FormData();
            fd.append('id', _id);
            fd.append('locale_id', $scope.localeId);

            $http.post(deleteUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function(result){
                // Remove record from list
                $scope.jsonRecords.splice(index, 1);
            })
            .error(function(error, status_code){
                $scope.flashMessages.push(['Failed to remove record, please try again', 'warning']);
            });
        });
    };

    // Displays a prompt to the user, to confirm they want to remove a record
    $scope.removeChildItem = function(p_index, p_id, index, _id, childname) {
        // Create the url endpoint path for the delete request
        url_parts = ['/api', pathname, p_id, childname, _id, 'delete']
        var deleteUrl = url_parts.join('/');

        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Delete item')
            .content('Are you sure you want to remove this item?')
            .ariaLabel('Delete item')
            .ok('Delete')
            .cancel('Cancel')
            .clickOutsideToClose(true);

        $mdDialog.show(confirm).then(function() {
            // Remove item from backend
            var fd = new FormData();
            fd.append('id', _id);
            fd.append('locale_id', $scope.localeId);

            $http.post(deleteUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function(result){
                // Remove record from list
                $scope.jsonRecords[p_index].children.splice(index, 1);
            })
            .error(function(error, status_code){
                $scope.flashMessages.push(['Failed to remove record, please try again', 'warning']);
            });
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
