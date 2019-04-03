let movieListModule = angular.module("MovieListModule", ["PageConfigModule", "ModelModule"]);
/**
 * 电影列表的控制器。
 * NOTE 控制器在Angular中是不存在的。
 */
movieListModule.controller("MovieListController", function($scope, $routeParams, PageConfigService, ModelService) {
	$scope.name = "电影列表";
	$scope.params = $routeParams;
	//获取列表的类别
	let category = $routeParams.category;
	//获取列表的当前页
	let page = $routeParams.page - 0;
	//每页有多少条数据
	let countPerPage = PageConfigService.getCountPerPage();
	//从第几条数据开始
	let start = countPerPage * (page - 1);
	//NOTE 这是什么鬼？
	let pager = $scope.pager = {current: page};
	//翻页操作
	$scope.pages = function(data) {
		pager.total = Math.ceil(data.total / countPerPage);
		//不能翻到第0页
		pager.prev = page - 1 > 0 ? page - 1 : 1;
		//不能翻过最后一页
		pager.next = page + 1 >= pager.max ? pager.max : page + 1;
		$scope.loading = false;
	};
	//代表数据正在加载
	$scope.loading = true;
	switch(category) {
		case "top250":
			ModelService.getTop250(start, countPerPage, function(data) {
				$scope.data = data;
				pager.category = "top250";
				$scope.pages(data);
			});
			break;
		case "coming_soon":
			ModelService.getComingSoon(start, countPerPage, function(data) {
				$scope.data = data;
				pager.category = "coming_soon";
				$scope.pages(data);
			});
			break;
		case "in_theaters":
			ModelService.getInTheaters(start, countPerPage, function(data) {
				$scope.data = data;
				pager.category = "in_theaters";
				$scope.pages(data);
			});
			break;
		default:
			break;
	}
});
