import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';

@Injectable()
export class IndexService {

    constructor(private http: Http) {
    }

    getData() {//https://api.github.com/users/octocat
        return this.http.get('https://api.github.com/users/octocat/followers');
    }

}