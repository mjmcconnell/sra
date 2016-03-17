var app = angular.module('App', ['ngMaterial']); // jshint ignore:line

// Syntax changed to prevent conflicts with jinja2
app.config(function($interpolateProvider, $mdThemingProvider) {
    $interpolateProvider.startSymbol('{[');
    $interpolateProvider.endSymbol(']}');
});

// List controller
app.controller('AppCtrl', function($scope) {

    $scope.colorTiles = (function() {
        var tiles = [];
        for (var i = 0; i < 30; i++) {
            tiles.push({
                color: "grey",
                colspan: randomSpan(),
                rowspan: randomSpan()
            });
        }
        return tiles;
    })();

    function randomSpan() {
        var r = Math.random();
        if (r < 0.8) {
            return 1;
        } else if (r < 0.9) {
            return 2;
        } else {
            return 3;
        }
    }

});
