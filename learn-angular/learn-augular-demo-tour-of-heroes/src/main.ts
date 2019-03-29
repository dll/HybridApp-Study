import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

//项目的入口脚本

//如果是要发布项目，则禁用包括断言等开发时适用的功能
if (environment.production) {
    enableProdMode();
}

//通过运行时编译器加载实例化的模块，一般是项目的主模块
platformBrowserDynamic().bootstrapModule(AppModule);
