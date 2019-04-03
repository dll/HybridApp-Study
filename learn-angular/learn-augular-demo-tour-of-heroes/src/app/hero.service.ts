import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {Hero} from './hero';
import {MessageService} from './message.service';

//配置http选项，指定内容为json文本
const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

//英雄的服务类，包含异步操作，需要用到管道
//注入元数据（从根作用域）
//NOTE @Injectable是通过类型注入，而非名称
@Injectable({providedIn: 'root'})
export class HeroService {
    private heroesUrl = 'api/heroes';  // URL to web api

    //在初始化类时注入属性，省略外面的属性声明
    //NOTE 构造方法最好只用于初始化注入，其他操作写在ngInit方法中，并实现OnInit接口
    constructor(
        private http: HttpClient,
        private messageService: MessageService) {
    }

    //从服务器得到英雄数组，返回的是可观察泛型对象，类似约定泛型对象
    getHeroes(): Observable<Hero[]> {
        //创建get请求，传递json数据，返回指定类型的请求主体
        //接着进行管道传传输，忽略参数
        return this.http.get<Hero[]>(this.heroesUrl)
            .pipe(
                //每次Tick的操作？
                tap(_ => this.log('fetched heroes')),
                //捕获到错误后的操作
                catchError(this.handleError<Hero[]>('getHeroes', [])),
            );
    }

    /** GET hero by id. Return `undefined` when id not found */
    getHeroNo404<Data>(id: number): Observable<Hero> {
        const url = `${this.heroesUrl}/?id=${id}`;
        return this.http.get<Hero[]>(url)
            .pipe(
                //这个映射操作对于整个数组只保留返回第一个元素
                map(heroes => heroes[0]), // returns a {0|1} element array
                tap(h => {
                    const outcome = h ? `fetched` : `did not find`;
                    this.log(`${outcome} hero id=${id}`);
                }),
                catchError(this.handleError<Hero>(`getHero id=${id}`)),
            );
    }

    /** GET hero by id. Will 404 if id not found */
    getHero(id: number): Observable<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get<Hero>(url).pipe(
            tap(_ => this.log(`fetched hero id=${id}`)),
            catchError(this.handleError<Hero>(`getHero id=${id}`)),
        );
    }

    /* GET heroes whose name contains search term */
    searchHeroes(term: string): Observable<Hero[]> {
        //如果term为null、为空，则返回空数组可观察对象
        if (!term.trim()) {
            // if not search term, return empty hero array.
            return of([]);
        }
        return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
            tap(_ => this.log(`found heroes matching "${term}"`)),
            catchError(this.handleError<Hero[]>('searchHeroes', [])),
        );
    }

    //////// Save methods //////////

    /** POST: add a new hero to the server */
    addHero(hero: Hero): Observable<Hero> {
        return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
            tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
            catchError(this.handleError<Hero>('addHero')),
        );
    }

    /** DELETE: delete the hero from the server */
    deleteHero(hero: Hero | number): Observable<Hero> {
        const id = typeof hero === 'number' ? hero : hero.id;
        const url = `${this.heroesUrl}/${id}`;

        return this.http.delete<Hero>(url, httpOptions).pipe(
            tap(_ => this.log(`deleted hero id=${id}`)),
            catchError(this.handleError<Hero>('deleteHero')),
        );
    }

    /** PUT: update the hero on the server */
    updateHero(hero: Hero): Observable<any> {
        return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
            tap(_ => this.log(`updated hero id=${hero.id}`)),
            catchError(this.handleError<any>('updateHero')),
        );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            //返回空对象，以让程序继续运行
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }
}
