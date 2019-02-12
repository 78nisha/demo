import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import{Http, RequestOptions, Headers} from '@angular/http';

@Injectable()
export class EcaSecondService {

  constructor(private http: HttpClient){ }

  getECADetail(studentID,year){
	console.log(studentID,year);
 	return this.http.get('https://demo-api.edscope.info/kidzee/eca/' + studentID + '/' + 2 + '/' + year);
 	}
}

