import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {HeroesComponent} from './heroes/heroes.component';

//定义路由数组
const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'detail/:id', component: HeroDetailComponent},
    {path: 'heroes', component: HeroesComponent},
];

//项目的路由模块
@NgModule({
    //导入：通过routes创建的模块
    //导出：系统的RouterModule模块
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
