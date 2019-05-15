//得到AngularJS模块对象
let app = angular.module("myNoteApp", []);
//得到AngularJS控制器对象，传入$scope参数，以得到AngularJS变量
myApp.controller("myNoteCtrl", function($scope) {
	//初始化AngularJS变量，包括方法。
	$scope.message = "";
	$scope.left = function() {
		return 100 - $scope.message.length;
	};
	$scope.clear = function() {
		$scope.message = "";
	};
	$scope.save = function() {
		alert("Note Saved");
	};
});
