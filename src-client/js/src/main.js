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
            var props = randomImage();
            console.log(props);
            tiles.push({
                color: "grey",
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

});
