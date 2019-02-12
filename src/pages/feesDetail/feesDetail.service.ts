import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import{Http, RequestOptions, Headers} from '@angular/http';

@Injectable()
export class FeesDetailService {

constructor(private http: HttpClient){ }

getFeesDetail(reverseYear,studentID){
	console.log(reverseYear,studentID);
 	return this.http.get('https://demo-api.edscope.info/monthly/students/fee/total/' + reverseYear + '/' + studentID);
 	}
getProfile(name){
 	return this.http.get('https://demo-api.edscope.info/kidzee/student/' + name);
 	}
}

