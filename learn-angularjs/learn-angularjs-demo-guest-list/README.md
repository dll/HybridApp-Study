# 概述

AngularJS Demo项目：一个简单的邀请名单应用。

* 来自《HTML5混合App开发》。
* AngularJS可以逼死强迫症。

# 要点

## ES6类的创建

```ecmascript 6
//定义类
class User {
	//不需要主动声明类的字段

	//声明类的属性
	//类的属性不应该和对应的字段同名，对应的字段可以直接访问
	//get方法不能单独存在，get方法和set方法必须同级出现
	get Name() {
		return this.name;
	}

	set Name(name) {
		this.name = name;
	}

	//声明类的有参构造方法
	constructor(name, race, gender, age) {
		this.name = name;
		this.race = race;
		this.gender = gender;
		this.age = age;
	}

	//声明类的方法
	print() {
		console.log(this);
	}

	//声明类的静态方法
	static count() {
		return 1;
	}
}

//定义子类（不能继承常规对象）
class BreezeKnight extends User {
	//子类的构造方法中必须首先调用父类的构造方法，且父类的构造方法只能在子类的构造方法中调用
	constructor(name, race, gender, age) {
		super(name, race, gender, age);
	}
}

//实例化类

let user_Windea = new BreezeKnight("Windea", "WindKid", "Female",
	{"appValue": 4500, "attachType": "RequiriumJewelry"});



//定义修饰器
//修饰器是一个函数，用来修改类的行为，在代码编译时产生作用。
//修饰器必须带有正确的参数，返回正确的值；或者返回一个这样的函数。
//常用修饰器的第三方模块：core-decorators.js

//定义类的修饰器
//参数：target，指向类本身
function immortal(immortal = true) {
	return function(target) {
		target.immortal = immortal;
	}
}

//定义方法的修饰器
//参数：target，类的原型对象，name，修饰的属性名，descriptor，该属性的描述对象。
//必须返回descriptor

//修饰器的执行顺序：
//由外向内进入，由内向外执行。
function canExtend(extensible = true) {
	return function(target, name, descriptor) {
		target.extensible = extensible;
		return descriptor;
	};
}



//得到类名
console.log(User.name);
```
