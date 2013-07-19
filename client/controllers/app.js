var WineApp = angular.module('wineApp', [])

WineApp.config(function($routeProvider, $locationProvider) {
  $routeProvider

  	.when('/', {controller: ListController, templateUrl: '/partials/DisplayWines.html'})
  	
  	// NewWines
    .when('/NewWines', {controller: CreateController, templateUrl: '/partials/DetailsWines.html'})

    // EditWines
    .when('/EditWines/:id', {controller: EditController, templateUrl: '/partials/DetailsWines.html'})

    .when('/SelectWines', {controller: ListController, templateUrl: '/partials/SelectWine.html'})

    .otherwise({redirectTo: '/'})
    
})


