import {Component} from '@angular/core';

//项目的主组件
//使用@Component装饰器以声明一个类为组件
@Component({
    //该组件对应的选择器（一般为标签）
    selector: 'app-root',
    //该组件对应的模版的路径，一般以`./`开头以适配相对目录
    //也可以赋值template属性以使用内联模版
    templateUrl: './app.component.html',
    //该组件对应的样式的路径，一般以`./`开头以适配相对目录
    //也可以赋值styles以使用内联样式
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    //项目的标题
    title = 'Tour of Heroes';
}
