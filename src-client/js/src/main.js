var app = angular.module('App', ['ngMaterial']); // jshint ignore:line

// Syntax changed to prevent conflicts with jinja2
app.config(function($interpolateProvider, $mdThemingProvider) {
    $interpolateProvider.startSymbol('{[');
    $interpolateProvider.endSymbol(']}');
});

// List controller
app.controller('AppCtrl', function($scope, $mdMedia, $mdDialog, $http, $mdToast) {

    $scope.colorTiles = (function() {
        var tiles = [];
        for (var i = 0; i < 30; i++) {
            var props = randomImage();
            tiles.push({
                colspan: 1,
                rowspan: props[0],
                'imgSrc': '/static/img/' + props[1]
            });
        }
        return tiles;
    })();

    function randomImage() {
        var rowSpan = 1;
        var imgSrc = '';

        var srcs = {
            'square': 'seal.jpg',
            'tall': [
                'fox.jpg',
                'horse.jpg',
                'hare_side.jpg',
                'hare_fr.jpg',
                'hare_side.jpg',
            ]
        }
        var r = Math.random();
        if (r < 0.6) {
            imgSrc = srcs['square'];
        } else {
            rowSpan = 2;
            imgSrc = srcs['tall'][Math.floor(Math.random() * srcs['tall'].length)];
        }
        return [rowSpan, imgSrc];
    }

    $scope.showDialog = function(event, index) {
        $scope.activeEl = $scope.colorTiles[index];
        $mdDialog.show({
            controller: DialogController,
            template: `
                <md-dialog id="imageDialog" aria-label="Image Details" ng-cloak>
                    <form>
                        <md-toolbar>
                            <div class="md-toolbar-tools">
                                <h2>Toolbar title</h2>
                                <span flex></span>
                                <md-button class="md-icon-button" ng-click="cancel()">
                                    <md-icon md-svg-src="/static/img/icons/ic_close_white_24px.svg" aria-label="Close dialog"></md-icon>
                                </md-button>
                            </div>
                        </md-toolbar>
                        <md-dialog-content>
                            <div class="md-dialog-content">
                                <h2>Image Title</h2>
                                <p>
                                    The mango is a juicy stone fruit belonging to the genus Mangifera, consisting of numerous tropical fruiting trees, cultivated mostly for edible fruit.
                                </p>
                                <img style="margin: auto; max-width: 100%;" alt="Image alt" ng-src="{[ activeEl.imgSrc ]}">
                            </div>
                        </md-dialog-content>
                        <md-dialog-actions layout="row">
                            <span flex></span>
                            <md-button ng-click="cancel()">
                                Close
                            </md-button>
                        </md-dialog-actions>
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
            $scope.showSimpleToast('Message Sent', 'success');
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
            $scope.showSimpleToast(error_message, 'warning');
        });
    };

    $scope.showSimpleToast = function(text, _class) {
        $mdToast.show(
            $mdToast.simple()
                .textContent(text)
                .position('bottom')
                .hideDelay(0)
        );
    };
});
