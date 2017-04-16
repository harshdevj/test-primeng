import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { HttpClient } from './http.service';
import { Http } from '@angular/http';
@Component({
    selector: 'test',
    template: `Observable test {{data|async}}`
})
export class TestComponent {

    private data: any;

    constructor(http: Http) {
        /*this.data = new Observable(o => {
            setTimeout(()=>{
                o.next(12);
            }, 1000);
            setTimeout(()=>{
                o.next(13);
            }, 2000);
            setTimeout(()=>{
                o.next(14);
                o.complete();
            }, 3000);
        });*/

        http.get('http://localhost:8081/listUsers').subscribe(
            resp => console.info('sub: ', resp),
            err => console.info('sub: ', err),
            () => console.warn('sub: ', 'Request completed!')
        )

        /*this.data = Observable.interval(1000).take(5).map(x=>{
            if (x===4)
                throw 'Four is error!'
            return x;
        })
        .retry(1);

        let subscriber = this.data.subscribe(
            v => console.info(v),
            err => console.error('Error handler: ', err),
            () => console.info('Done')
        );*/
    }

}