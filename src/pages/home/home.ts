import { Component, ViewChild } from '@angular/core';
import { NavController,NavParams, Slides, AlertController,LoadingController,ToastController,Platform} from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { HttpClient} from '@angular/common/http';
import { Http} from '@angular/http';
import { HomeService } from './home.service';
import {Storage} from '@ionic/Storage';
import { FeedbackPage } from '../../pages/feedback/feedback';
//import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
//import {LocalNotifications} from '@ionic-native/local-notifications';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ HomeService]
})
export class HomePage {
  name;
  id = [];
  notices = [];
  notice;
  noticeTitle;
  profileData = [];
  profileEmail = [];
  firstName = [];
  lastName = [];
  emailData = [];
  p_emailData;
  spliceYear;
  fiscalyear = [];
  year;
  reverseYear;
  public buttonClicked: boolean = false;
 
  @ViewChild(Slides) slides: Slides;
  public counter=0;

  constructor(public platform: Platform,public toastController: ToastController,public navParams: NavParams,public loadingController:LoadingController,private alertCtrl: AlertController, public navCtrl: NavController,public storage: Storage,private homeService: HomeService,public http: Http,public httpClient: HttpClient) {

     platform.ready().then(() => {
      
      platform.registerBackButtonAction(() => {
        if (this.counter == 0) {
          this.counter++;
          this.presentToast();
          setTimeout(() => { this.counter = 0 }, 3000)
        } else {
          // console.log("exitapp");
          platform.exitApp();
        }
      }, 0)
    });

  this.name = localStorage.getItem('name');
  console.log(this.name);
  this.p_emailData = "Principal"
  //--------------------------------To get notices---------------------------------- 
     this.homeService.getAllNotice().subscribe((data: any)=> {
      console.log(data); 
      this.notices = data;


      });

   //--------------------------------To get Fiscal Year
     this.homeService.getFiscalYear().subscribe((data: any)=> {
      console.log(data);
      this.fiscalyear = data[0].year;
      console.log(this.fiscalyear);
      this.year = this.fiscalyear; 
      localStorage.setItem('fiscalYear', this.year);
      this.reverseYear = this.year.replace('/','.');
      console.log(this.reverseYear);
      this.spliceYear = this.reverseYear.substr(0,4);
      console.log(this.spliceYear);
      localStorage.setItem('nepaliYear',this.spliceYear);
      console.log(this.spliceYear);

    });

   //-------------------------------To get student profile detail--------------------------------
   let load = this.loadingController.create({content : "Please...", spinner: 'crescent'}); // Show loading until user get response
   load.present();
   this.homeService.getProfile(this.name).subscribe((data: any)=> {
      console.log(data)
      load.dismissAll();
      this.profileData = data;
      this.profileEmail.push(this.profileData[0].emailAddress);
      console.log(this.profileEmail);
      this.emailData = this.profileEmail;
      console.log(this.emailData);
      console.log(data[0].sid);
      localStorage.setItem('sid',data[0].sid); 
      // console.log(this.firstName);
      // console.log(this.lastName);
      });
  }
   ionViewDidLoad(){
    setTimeout(() =>
    this.slides.slideTo(1, 1000)
    ,1000);
  }

 
  view(noticeID){
    console.log(noticeID);
  //--------------------------------To get notice by id-----------------------------------
   this.homeService.getNotice(noticeID).subscribe((data: any)=> {
    console.log(data);
    this.noticeTitle = data[0].title; 
    this.notice = data[0].message;
    console.log(this.noticeTitle);
    console.log(this.notice);

    let prompt = this.alertCtrl.create({
      title: this.noticeTitle,
      subTitle: this.notice,
      buttons: ['OK'],
      cssClass: 'alertCustomCss'
    })
     prompt.present();
     }); 
  }
    public onButtonClick() {

        this.buttonClicked = !this.buttonClicked;
    }

  //   questionForm(){
  //   this.navCtrl.push(FeedbackPage, {email: this.profileEmail});
  // }

   feedbackButton(message){
    console.log(message);
    var id  = localStorage.getItem('name');
    var feedBack = {
     id,
     message
    }
   let load = this.loadingController.create({content : "Please wait...", spinner: 'crescent'}); // Show loading until user get response
   load.present();
   this.homeService.feedbackForm(feedBack).subscribe((response:any) => {
     load.dismissAll();
     console.log(response);
     if(response.success == false){
       alert('Error Occured');
     }
     else{
       this.navCtrl.setRoot(HomePage);
     }
   });
  }

 presentToast() {
    let toast = this.toastController.create({
      message: "Press again to exit",
      duration: 3000,
      position: "bottom",
      cssClass: "toastCss",
    });
    toast.present();
  }

}
