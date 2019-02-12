import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import{Http, RequestOptions, Headers} from '@angular/http';

@Injectable()
export class ReportService {

  constructor(private http: HttpClient){ }

 // getECADetail(studentID,year){
	// console.log(studentID,year);
 // 	return this.http.get('https://demo-api.edscope.info/kidzee/eca/' + studentID + '/' + 1 + '/' + year);
 // 	}
 get1stResultDetail(year,studentID){
	console.log(year,studentID);
 	return this.http.get('https://demo-api.edscope.info/kidzee/student/report/' + 1 + '/' + year + '/' + studentID);
 	}

get2ndResultDetail(year,studentID){
	console.log(year,studentID);
 	return this.http.get('https://demo-api.edscope.info/kidzee/student/report/' + 2 + '/' + year + '/' + studentID);
 	}

get3rdResultDetail(year,studentID){
	console.log(year,studentID);
 	return this.http.get('https://demo-api.edscope.info/kidzee/student/report/' + 3 + '/' + year + '/' + studentID);
 	}
}

