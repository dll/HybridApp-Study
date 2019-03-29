# 项目分析

## 需求分析

本项目主要用于记录宴会受邀嘉宾的姓名、电话和受邀状态，要求具有如下功能：

* 展示全部受邀嘉宾的信息列表。
* 增加受邀嘉宾信息。
* 修改受邀嘉宾的状态。
* 删除受邀嘉宾的信息。
* 根据受邀嘉宾的状态，展示不同状态的受邀嘉宾列表。

## 数据存储分析

在实际开发中，一般前端和后端对接是由后端做接口，类似一个链接；前端通过Ajax调用接口，然后将调用接口获得的数据渲染到页面上。

使用AngularJS做后端开发时，通常通过$http服务奖后台发送请求，后台接收到请求后会调用相应的代码操作数据库。例如一个项目的后台使用Java来实现，使用MySQL数据库来存储数据。当列表展示功能需要查询数据时，可以使用AngularJS代码发送请求，示例代码如下：

```js
let guestController = angular.module('myApp',[]);
guestController.controller('myCtrl',function($scope,$http){
	$http.get('http://127.0.0.1:80/user/findAll')
		.then(function success(response){
			//...
		},function error(response){
			//...
		});
});
```

在上述代码中，请求会访问后台Java提供的接口，调用操作数据库的代码，由Java代码结合SQL语句来操作数据库。（最好传输JSON对象）