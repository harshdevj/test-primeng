import { Injectable, } from "@angular/core";
import {
    Headers, Http, Request, Response, RequestOptionsArgs,
    URLSearchParams, RequestMethod, ConnectionBackend,
    RequestOptions
} from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CustomHttp extends Http {
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }

    /*request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        console.log('request...');
        return super.request(url, options).catch(res => {
            console.info('options: ', options);
            return this.post("http://localhost:8081/login", {})
                .flatMap((data: any) => {
                    let headers = new Headers({ 'AUTH_TOKEN': 'xxxAAA' });
                    let op = new RequestOptions({ headers: headers });
                    return super.request(url, op);
                });
        });
}*/

    get1(url: string, options?: RequestOptionsArgs): Observable<Response> {
        console.log('get...');
        return super.get(url, options)
            .catch(err => {
                return this.post("http://localhost:8081/login", {})
                    .flatMap((data: any) => {
                        let headers = new Headers({ 'AUTH_TOKEN': 'xxxAAA' });
                        let op = new RequestOptions({ headers: headers });
                        return super.get(url, op);
                    });
            });

        /*let subject = new Subject();

        super.get(url, options).subscribe(
            r => { subject.next(r); subject.complete(); },
            e => { 
                const params = {};
                subject.next(this.post("http://localhost:8081/login", params)
            .flatMap((data: any) => {
                let headers = new Headers({ 'AUTH_TOKEN': 'xxxAAA' });
                let op = new RequestOptions({ headers: headers });
                return super.get(url, op);
            }));
                subject.complete(); }
        );

        return subject;*/
        //return observable;
        /*return super.get(url, options)
            .catch(err => this.handleAuthenticationError(err, url));*/
    }

    private handleAuthenticationError(error: Response | any, url: string) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.info(errMsg);

        const params = {};
        return this.post("http://localhost:8081/login", params)
            .flatMap((data: any) => {
                let headers = new Headers({ 'AUTH_TOKEN': 'xxxAAA' });
                let op = new RequestOptions({ headers: headers });
                return super.get(url, op);
            });
    }
}