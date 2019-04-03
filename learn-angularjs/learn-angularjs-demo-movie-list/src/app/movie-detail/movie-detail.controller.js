let movieDetailModule = angular.module("MovieDetailModule", ["ModelModule"]);
/**
 * 电影详情的控制器。
 */
movieDetailModule.controller("MovieDetailController", function($scope, $routeParams, ModelService) {
	$scope.name = "电影详情";
	let subjectId = $routeParams.id;
	//调用服务获取电影详情
	ModelService.getSubject(subjectId, function(data) {
		//将获取到的数据放在作用域上
		$scope.data = data;
	});
});
