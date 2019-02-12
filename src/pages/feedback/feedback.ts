
import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { Http} from '@angular/http';
import { FeedbackService } from './feedback.service';
import {Storage} from '@ionic/Storage';
import { HomePage } from '../../pages/home/home';
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
  providers: [ FeedbackService]
})
export class FeedbackPage {
  emailData;
  p_emailData;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage,private feedbackService: FeedbackService,public http: Http,public httpClient: HttpClient) {
  this.emailData = navParams.get('email');
  console.log(this.emailData);
  this.p_emailData = "Principal"
  }

  feedbackButton(feedback){
    console.log(feedback);
    var id  = localStorage.getItem('name');
    var feedBack = {
     id,
     feedback
    }
    this.feedbackService.feedbackForm(feedBack).subscribe((response:any) => {
     console.log(response);
     if(response.success == false){
       alert('Error Occured');
     }
     else{
       this.navCtrl.setRoot(HomePage);
     }
   });
  }
}
