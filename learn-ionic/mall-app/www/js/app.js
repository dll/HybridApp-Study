angular.module('starter', ['ionic', 'route', 'config'])
  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      //表单输入时默认隐藏键盘上的附件栏
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      //设置状态栏的默认样式
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  });
