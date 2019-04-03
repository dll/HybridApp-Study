let applicationModule = angular.module("ApplicationModule", ["ngRoute", "MovieDetailModule", "MovieListModule"]);
/**
 * 项目路由的配置。
 * NOTE 这里的模版路径相对于这个模块对应的html文件的路径
 */
applicationModule.config(function($routeProvider) {
	$routeProvider
	//访问列表页
	.when("/list/:category/:page", {
		templateUrl: "app/movie-list/movie-list.template.html",
		controller: "MovieListController"
	})
	//访问详情页
	.when("/detail/:id", {
		templateUrl: "app/movie-detail/movie-detail.template.html",
		controller: "MovieDetailController"
	})
	//默认访问路径
	.otherwise({
		redirectTo: "/list/top250/1"
	})
});
