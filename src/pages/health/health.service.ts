import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import{Http, RequestOptions, Headers} from '@angular/http';

@Injectable()
export class HealthService {

constructor(private http: HttpClient){ }

getProfile(name){
 return this.http.get('https://demo-api.edscope.info/kidzee/student/' + name);
 }

getHealthInfo(name){
	console.log(name);
 	return this.http.get('https://demo-api.edscope.info/student/health/info/' + name);
 	}

getVaccinationInfo(name){
 	return this.http.get('https://demo-api.edscope.info/student/health/vaccination/' + name);
 	}

getCheckupLogInfo(name){
 	return this.http.get('https://demo-api.edscope.info/student/health/checkup/log/' + name);
 	}
 	
getHospitalizationInfo(name){
 	return this.http.get('https://demo-api.edscope.info/student/health/hospitalization/log/' + name);
 	}

}

