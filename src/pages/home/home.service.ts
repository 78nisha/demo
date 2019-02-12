import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import{Http, RequestOptions, Headers} from '@angular/http';

@Injectable()
export class HomeService {

  constructor(private http: HttpClient){ }

getAllNotice(){
  return this.http.get('https://demo-api.edscope.info/notices/all');
 }
getNotice(id){
	console.log(id);
  return this.http.get('https://demo-api.edscope.info/notice/' + id);
 }
getProfile(name){
 return this.http.get('https://demo-api.edscope.info/kidzee/student/' + name);
 }
 getFiscalYear(){
 	return this.http.get('https://demo-api.edscope.info/kidzee/latest/fiscalYear');
 	}
 feedbackForm(payload){
      console.log(payload)
      return this.http.post('https://demo-api.edscope.info/kidzee/feedback/email', payload);
 	}
}

