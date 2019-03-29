# 前置

## 动态引入

```
<link href="https://unpkg.com/@ionic/core@4.0.2/css/ionic.bundle.css" rel="stylesheet">
<script src="https://unpkg.com/@ionic/core@4.0.2/dist/ionic.js"></script>
```

## 参考链接

* [ionic教程 | 菜鸟教程](https://www.runoob.com/ionic/ionic-tutorial.html)
* [Ionic Framework - Ionic Documentation](https://ionicframework.com/docs)

## 常用命令

```
//ionic下载项目模版

//在项目要存放的位置打开命令行
//空白模版
$ ionic start myAppName blank
//带有标签页的模版（默认模版）
$ ionic start myAppName tabs
//带有左侧边栏的模版
$ ionic start myAppName sidemenu

// 为项目添加平台支持

//在项目目录中打开命令行
//添加Android平台支持
$ ionic platform add android
//添加IOS平台支持
$ ionic platform add ios

// 将项目打包成apk

//在项目目录中打开命令行
$ ionic build android
```

# 学习笔记

## 引入图标的另一种方式

```
<!--引入标准图标-->
<ion-icon name="add-circle-outline"></ion-icon>
<!--引入自定义图标-->
<ion-icon src="/path/to/external/file.svg"></ion-icon>
<!--区分平台-->
<ion-icon ios="ios-heart" md="md-heart"></ion-icon>
<!--设置图标大小-->
<ion-icon size="small"></ion-icon>
<ion-icon size="large"></ion-icon>
```

