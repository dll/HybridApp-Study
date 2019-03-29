import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {HeroSearchComponent} from './hero-search/hero-search.component';
import {HeroesComponent} from './heroes/heroes.component';
import {InMemoryDataService} from './in-memory-data.service';
import {MessagesComponent} from './messages/messages.component';

//项目的主模块
@NgModule({
    //需要导入的模块，一般为系统模块，可能包括通过forRoot方法创建的模块
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,

        // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
        // and returns simulated server responses.
        // Remove it when a real server is ready to receive requests.
        HttpClientInMemoryWebApiModule.forRoot(
            InMemoryDataService, {dataEncapsulation: false},
        ),
    ],
    //属于这个模块的自定义的组件、指令、管道等
    declarations: [
        AppComponent,
        DashboardComponent,
        HeroesComponent,
        HeroDetailComponent,
        MessagesComponent,
        HeroSearchComponent,
    ],
    //需要在加载该模块时加载的组件
    bootstrap: [AppComponent],
})
export class AppModule {
}
