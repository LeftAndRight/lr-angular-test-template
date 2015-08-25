angular.module("testTemplate", []);

angular.module("testTemplate").controller("MainController", ["$scope", function($scope){
	var self				= this;
	self.menuShowing		= false;
}]);