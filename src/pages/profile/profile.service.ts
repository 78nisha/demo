import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import{Http, RequestOptions, Headers} from '@angular/http';

@Injectable()
export class ProfileService {

  constructor(private http: HttpClient){ }

 getProfile(name){
 	return this.http.get('https://demo-api.edscope.info/kidzee/student/' + name);
 	}
}

