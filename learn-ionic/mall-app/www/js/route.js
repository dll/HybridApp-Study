/**
 * 全局路由配置文件。
 */
angular.module("route", [])
  .config(function ($stateProvider, $urlRouterProvider) {
    //在这里配置项目的全局路由
    //判断是否是第一次访问，如果是，跳转到引导页，否则跳转到主页
    if (localStorage["isFirst"]) {
      $urlRouterProvider.otherwise("/tab/home");
    } else {
      $urlRouterProvider.otherwise("/guide-page");
    }
  });
