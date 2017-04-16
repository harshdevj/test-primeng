import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { IndexService } from './index/index.service';

import { TestComponent } from './observer/test.component';
import { HttpClient } from './observer/http.service';

import { CustomHttp } from './observer/custom.http.service';
import { Http, XHRBackend, RequestOptions } from '@angular/http';

import { DataTableModule, SharedModule } from 'primeng/primeng';

@NgModule({
  declarations: [
    AppComponent, IndexComponent, TestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    DataTableModule, SharedModule
  ],
  providers: [IndexService, HttpClient, {
    provide: Http,
    useFactory: (backend, options) => {
      return new CustomHttp(backend, options);
    },
    deps: [XHRBackend, RequestOptions]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
