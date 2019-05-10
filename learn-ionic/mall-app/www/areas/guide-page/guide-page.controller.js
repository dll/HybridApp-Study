angular.module("guidePage", [])
  .controller("guidePageController", function ($scope, $state) {
    //当幻灯片滑动时触发的事件回调函数
    $scope.slideHasChanged = function (index) {
      index = parseInt(index);
      //将hidden类改为guide-show，显示动画效果
      let item = $(`#tips-${index}`);
      if (item.hasClass("hidden")) {
        item.removeClass("hidden").addClass("guide-show");
      }
      //为了从后向前播放时也有动画效果，需要将播放后的页面设置为hidden
      if (index === 0 || index === 2) {
        $("#tips-1").removeClass("guide-show").addClass("hidden");
      } else if (index === 1) {
        $("#tips-0").removeClass("guide-show").addClass("hidden");
      }
    };
    //跳转到主页的方法
    $scope.goHome = function () {
      localStorage["isFirst"] = true;
      $state.go("tab.home");
    }
  });
