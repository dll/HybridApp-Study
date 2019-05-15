let pageConfigModule = angular.module("pageConfig", []);
/**
 * 分页配置的服务。
 */
pageConfigModule.service("pageConfigService", function() {
	let countPerPage = 10;
	this.getCountPerPage = function() {
		return countPerPage;
	}
});
