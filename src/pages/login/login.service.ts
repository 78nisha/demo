import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import{Http, RequestOptions, Headers} from '@angular/http';

@Injectable()
export class LoginService {

constructor(private http: HttpClient){ }

postLogIn(login){
      console.log(login)
      return this.http.post('https://demo-api.edscope.info/login', login);
 	}
}

