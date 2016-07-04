var myApp = angular.module('mainApp', ['ngRoute' , 'ngCookies']);

myApp
.config(function($routeProvider) {
 	$routeProvider
 	.when('/',{
 		templateUrl: 'login.html'
 	})
    .when('/admindashboard',{
        templateUrl: 'admindashboard.html'
    })
    .when('/trainerdashboard',{
    templateUrl: 'tdashboard.html'
    })
    .when('/dashboard',{
        templateUrl: 'dashboard.html'
    })
    .when('/registertraining',{
        templateUrl: 'registertraining.html'
    })
    .when('/deletetraining',{
        templateUrl: 'deletetraining.html'
    })
    .when('/searchtraining',{
        templateUrl: 'searchtraining.html'
    })
    .when('/mandatorytraining',{
        templateUrl: 'mandatorytraining.html'
    })
    .when('/trainingsbyyou',{
        templateUrl: 'trainingsbyyou.html'
    })
    .when('/logout',{
        templateUrl: 'logout.html'
    })
    .otherwise({
 		redirectTo:'/'
 	});
 });