import { Injectable } from "@angular/core";
import { Headers, Http, Response, RequestOptionsArgs, URLSearchParams, RequestMethod } from "@angular/http";
import { Observable } from "rxjs/Observable";

//import { SessionStorage } from "./session_storage.service";
//import { Router } from "@angular/router";

@Injectable()
export class HttpClient {

    constructor(
        private http: Http/*,
        private router: Router,
        private sessionStorage: SessionStorage*/) { }

    public get(url: string, search?: URLSearchParams): Observable<Object> {
        return this.request(url, { method: RequestMethod.Get, search })
            .map((response: Response) => response.json());
    }

    public post(url: string, data?: Object): Observable<Object> {
        return this.request(url, { method: RequestMethod.Post }, data)
            .map((response: Response) => response.json());
    }

    public put(url: string, data?: Object): Observable<Object> {
        return this.request(url, { method: RequestMethod.Put }, data)
            .map((response: Response) => response.json());
    }

    public delete(url: string): Observable<Object> {
        return this.request(url, { method: RequestMethod.Delete });
    }

    private request(url: string, options: RequestOptionsArgs, data?: Object): Observable<Response> {
        options.headers = new Headers();

        /*if (this.sessionStorage.accessToken) {
            options.headers.append("Authorization", `Bearer ${this.sessionStorage.accessToken}`);
        }

        if (options.method === RequestMethod.Post || options.method === RequestMethod.Put) {
            options.headers.append("Content-Type", "application/json");
    }*/
        options.headers.append("AUTH_TOKEN", "xxxAAA");
        options.headers.append("Access-Control-Allow-Origin", "http://localhost:4200");

        if (data) {
            options.body = JSON.stringify(data);
        }

        // TODO write specs for the refresh logic
        // TODO refactor
        return this.http.request(url, options).catch((error) => {
            if (error.status === 401) {
                const params = { refreshToken: 'test', admin: true };
                return this.post("http://localhost:8081/login", params)
                    .flatMap((data: any) => {
                        //this.sessionStorage.accessToken = data.accessToken;
                        return this.request(url, options, data);
                    })
                    /*.catch(() => {
                        //this.sessionStorage.destroy();
                        return Observable.fromPromise(this.router.navigate(["/Login"]));
        })*/;
            }

            return Observable.throw(error);
        });
    }

}
