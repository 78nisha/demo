import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import{Http, RequestOptions, Headers} from '@angular/http';

@Injectable()
export class FeesService {

constructor(private http: HttpClient){ }

getFeesDetail(reverseYear,studentID){
	console.log(reverseYear,studentID);
 	return this.http.get('https://demo-api.edscope.info/monthly/students/fee/total/' + reverseYear + '/' + studentID);
 	}
 	
getFeesReceiptDetail(reverseYear,studentID){
	console.log(reverseYear,studentID);
 	return this.http.get('https://demo-api.edscope.info/monthly/reciept/report/student/' + reverseYear + '/' + studentID);
 	}
getFeesDueDetail(studentID){
	console.log(studentID);
 	return this.http.get('https://demo-api.edscope.info/kidzee/students/due/' + studentID);
 	}
getFiscalYear(){
 	return this.http.get('https://demo-api.edscope.info/kidzee/latest/fiscalYear');
 	}
getProfile(name){
 	return this.http.get('https://demo-api.edscope.info/kidzee/student/' + name);
 	}

}
