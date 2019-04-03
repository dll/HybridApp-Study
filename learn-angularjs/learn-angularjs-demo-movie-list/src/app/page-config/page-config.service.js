let pageConfigModule = angular.module("PageConfigModule", []);
/**
 * 分页配置的服务。
 */
pageConfigModule.service("PageConfigService", function() {
	let countPerPage = 10;
	this.getCountPerPage = function() {
		return countPerPage;
	}
});
