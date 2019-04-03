let modelModule = angular.module("ModelModule", ["JsonpModule"]);
/**
 * 模型服务。
 */
modelModule.service("ModelService", function(JsonpService) {
	//即将上映
	this.getComingSoon = function(start, count, callback) {
		let url = `http://api.douban.com/v2/movie/coming_soon?start=${start}&count=${count}&callback=JSON_CALLBACK`;
		JsonpService.getCallback(url, function(data) {
			callback(data);
		});
	};
	//正在热映
	this.getInTheaters = function(start, count, callback) {
		let url = `http://api.douban.com/v2/movie/in_theaters?start=${start}&count=${count}&callback=JSON_CALLBACK`;
		JsonpService.getCallback(url, function(data) {
			callback(data);
		});
	};
	//top250
	this.getTop250 = function(start, count, callback) {
		let url = `http://api.douban.com/v2/movie/top250?start=${start}&count=${count}&callback=JSON_CALLBACK`;
		JsonpService.getCallback(url, function(data) {
			callback(data);
		});
	};
	//电影详情
	this.getSubject = function(id, callback) {
		let url = `http://api.douban.com/v2/movie/subject/${id}?&callback=JSON_CALLBACK`;
		JsonpService.getCallback(url, function(data) {
			callback(data);
		});
	};
});
