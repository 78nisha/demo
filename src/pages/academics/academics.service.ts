import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import{Http, RequestOptions, Headers} from '@angular/http';

@Injectable()
export class AcademicsService {

constructor(private http: HttpClient){ }

getFiscalYear(){
 	return this.http.get('https://demo-api.edscope.info/kidzee/latest/fiscalYear');
 	}

get1stResultDetail(yearValue,studentID){
	console.log(yearValue,studentID);
 	return this.http.get('https://demo-api.edscope.info/kidzee/student/report/' + 1 + '/' + yearValue + '/' + studentID);
 	}

get2ndResultDetail(year,studentID){
	console.log(year,studentID);
 	return this.http.get('https://demo-api.edscope.info/kidzee/student/report/' + 2 + '/' + year + '/' + studentID);
 	}

get3rdResultDetail(year,studentID){
	console.log(year,studentID);
 	return this.http.get('https://demo-api.edscope.info/kidzee/student/report/' + 3 + '/' + year + '/' + studentID);
 	}

getInternalDetail(studentID, year){
	console.log(studentID, year);
 	return this.http.get('https://demo-api.edscope.info/achievements/internal/' + studentID + '/' + year);
 	}
getExternalDetail(studentID, year){
	console.log(studentID, year);
 	return this.http.get('https://demo-api.edscope.info/achievements/external/' + studentID + '/' + year);
 	}
}

