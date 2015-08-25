describe("main-controller-test", function() {

	beforeEach(module("testTemplate"));

	it("Test toggle changes", inject(function($rootScope, $controller) {
		var MainController = $controller("MainController", {$scope: $rootScope.$new()});

		// init
		expect(MainController.menuShowing).toBeFalsy();
	}));
});