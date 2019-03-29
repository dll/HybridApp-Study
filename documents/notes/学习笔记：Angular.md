# 前置

## 参考链接

* [文档简介 · TypeScript中文网 · TypeScript——JavaScript的超集](https://www.tslang.cn/docs/home.html)
* [Angular - 教程](https://www.angular.cn/tutorial)

## 常用命令

```
//npm安装Angular Cli
$ npm install -g @angular/cli

//创建一个Angular应用
$ ng new my-app

//为Angular应用添加服务
//构建本应用、启动开发服务器、监听源文件，并且当那些文件发生变化时重新构建本应用
$ cd my-app
$ ng serve --open
```

## 常见语法

* `(event)="expression"`：用于绑定元素/组件/指令的事件。
	* `<button (click)="onKey()">`
	* `()`里面写明事件的名称，不需要添加on前缀。值为一个Angular表达式。
* `[prop]="expression"`：用于数据的单向绑定。用于绑定元素/组件/指令的属性（Property）。
	* 另一种写法：`bind-prop`
	* 添加`attr.`前缀以绑定没有对应Attribute的属性。例如：`xxxspan`，`aria-xxx`
	* 简单理解：Attribute仅用于初始化。
	* 例如：`<tr><td [attr.colspan]="1 + 1">One-Two</td></tr>`
	* 如果数据类型是字符串，可以替代特殊语法用插值表达式作为值。例如：`event="{{expression}}"`。
* `{{expression}}`：插值表达式。用于数据的单向绑定，写在标签体中。
* `[(event/prop)]="expression"`：用于数据的双向绑定。用于绑定事件和属性。
* `#elemName`：用于将DOM元素绑定到模版引用变量。
	* `<input #box (keyup)="0" value="123">`
	* 获取该元素的值：`<input #box (keyup)="onKey(box.value)">`
	* 获取该元素的值：`<p>{{box.value}}</p>`。
* `[class.myClass]="()=>boolean"`：用于绑定特定的css类，判断它们是否应该显示。
	* 参照：`[ngClass]`
* `[style.myStyle]="()=>string"`：用于绑定特定的css样式，判断它们的值应该是什么。
	* 参照：`[ngStyle]`

# 学习笔记
