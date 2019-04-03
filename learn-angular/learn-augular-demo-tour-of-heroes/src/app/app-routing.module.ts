import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {HeroesComponent} from './heroes/heroes.component';

//定义路由数组
const routes: Routes = [
    //path参数是不以/开头的地址
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    //:param用于引用参数
    {path: 'detail/:id', component: HeroDetailComponent},
    {path: 'heroes', component: HeroesComponent},
];

//项目的路由模块
@NgModule({
    //导入：通过routes创建的模块
    imports: [RouterModule.forRoot(routes)],
    //导出：系统的RouterModule模块
    exports: [RouterModule],
})
export class AppRoutingModule {
}
