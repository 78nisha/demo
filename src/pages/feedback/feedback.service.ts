import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import{Http, RequestOptions, Headers} from '@angular/http';

@Injectable()
export class FeedbackService {

  constructor(private http: HttpClient){ }

  feedbackForm(payload){
      console.log(payload)
      return this.http.post('https://demo-api.edscope.info/kidzee/feedback/email', payload);
 	}

}

