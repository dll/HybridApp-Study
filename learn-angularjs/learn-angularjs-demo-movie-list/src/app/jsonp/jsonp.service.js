let jsonpModule = angular.module("JsonpModule", []);
/**
 * 自定义的Jsonp服务。
 */
jsonpModule.service("JsonpService", function($rootScope) {
	//计数器变量
	let count = 0;
	/**
	 * 得到自定义的回调函数。
	 * @param url {string} jsonp访问的url。
	 * @param callback {function} 回调函数，参数是data对象。
	 */
	this.getCallback = function(url, callback) {
		let fnName = "callback" + count++;
		let newUrl = url.replace("JSON_CALLBACK", fnName);
		//创建script标签，放到window对象上，然后获取data数据并传递给callback
		//然后使用$apply()函数通知作用于数据数据发生变化，然后删除script标签
		let scriptElem = document.createElement("script");
		scriptElem.src = newUrl;
		//document.body.appendChild(scriptElem);
		document.body.append(scriptElem);
		window[fnName] = function(data) {
			callback(data);
			$rootScope.$apply();
			//document.body.removeChild(scriptElem);
			scriptElem.remove();
		}
	}
});
