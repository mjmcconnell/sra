var app = angular.module('App', ['ngMaterial']); // jshint ignore:line

// Syntax changed to prevent conflicts with jinja2
app.config(function($interpolateProvider, $mdThemingProvider) {
    $interpolateProvider.startSymbol('{[');
    $interpolateProvider.endSymbol(']}');
});

app.run(['$anchorScroll', function($anchorScroll) {
    $anchorScroll.yOffset = 60;
}])

// Site Nav controller
app.controller('NavCtrl', function($scope, $mdSidenav) {
    $scope.toggleNav = function(el) {
        $mdSidenav(el).toggle();
    };
});

// Workshops controller
app.controller('WorkshopsCtrl', function($scope, $mdDialog) {

    $scope.openEventForm = function(event, index) {
        $scope.activeEl = $scope.events[index];
        $mdDialog.show({
            controller: DialogController,
            template: `
                <md-dialog id="workshopDialog" aria-label="Image Details" ng-cloak>
                    <form name="workshopForm" novalidate class="workshop-form">
                        <md-card>
                            <md-card-content>
                                <h1 class="md-subhead workshop-form-header-copy">Please fill in the form to sign up for the workshop</h1>
                                <md-input-container class="md-block">
                                    <label for="name">Name</label>
                                    <input required id="name" name="name" type="text" ng-model="formData.name">
                                    <div ng-messages="formData.name.$error" role="alert" class="md-input-message-animation">
                                        <div ng-message="server" ng-repeat="error in serverErrors.name track by $index">{[error]}</div>
                                    </div>
                                </md-input-container>
                                <md-input-container class="md-block">
                                    <label for="email">Email Address</label>
                                    <input required type="email" name="email" ng-model="formData.email" minlength="10" maxlength="100" ng-pattern="/^.+@.+\..+$/" />
                                    <div ng-messages="formData.email.$error" role="alert" class="md-input-message-animation">
                                        <div ng-message="server" ng-repeat="error in serverErrors.email track by $index">{[error]}</div>
                                    </div>
                                </md-input-container>
                                <md-button class="contact-form-btn" ng-click="submitForm()">Sumbit</md-button>
                            </md-card-content>
                        </md-card>
                    </form>
                </md-dialog>`,
            parent: angular.element(document.body),
            scope: $scope,
            preserveScope: true,
            targetEvent: event,
            clickOutsideToClose:true
        }).then(function(answer) {
            // User chose an answer
        }, function() {
            // Dialog was closed
        });
    };
    function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    };
});

// Contact controller
app.controller('ContactCtrl', function($scope, $http, $mdToast) {

    $scope.populateForm = function(json_record) {
        console.log(json_record);
        for (var key in json_record) {
            $scope.formData[key] = json_record[key];
        }
    }

    $scope.formData = {};
    $scope.submitForm = function(){
        $scope.toastMessage = false;
        $scope.serverErrors = {};
        var uploadUrl = '/api/contact';

        // Create an empty FormData object to store all form fields
        var fd = new FormData();

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
            $scope.showSimpleToast('Message Sent');
        }).error(function(error, status){
            var error_message = 'Something went wrong, please check your form.'
            if (error['message']) {
                error_message = error['message'];
            } else if (error['error']) {
                error_message = error['error'];
            }
            for (var key in error['data']) {
                $scope.serverErrors[key] = error['data'][key];
            }
            $scope.showSimpleToast(error_message);
        });
    };

    $scope.showSimpleToast = function(text) {
        $mdToast.show(
            $mdToast.simple()
                .textContent(text)
                .hideDelay(3000)
        );
    };
});
