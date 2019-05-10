angular.module("guidePage", [])
  .config(function ($stateProvider) {
    $stateProvider.state("guidePage", {
      url: "/guidePage",
      templateUrl: "areas/guide-page/guide-page.html",
      controller: "guidePageController"
    })
  });
