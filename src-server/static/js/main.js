/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	var app = angular.module('App', ['ngMaterial']); // jshint ignore:line
	
	// Syntax changed to prevent conflicts with jinja2
	app.config(function ($interpolateProvider, $mdThemingProvider) {
	    $interpolateProvider.startSymbol('{[');
	    $interpolateProvider.endSymbol(']}');
	});
	
	// List controller
	app.controller('AppCtrl', function ($scope) {
	
	    $scope.colorTiles = function () {
	        var tiles = [];
	        for (var i = 0; i < 30; i++) {
	            tiles.push({
	                color: "grey",
	                colspan: randomSpan(),
	                rowspan: randomSpan()
	            });
	        }
	        return tiles;
	    }();
	
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

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map