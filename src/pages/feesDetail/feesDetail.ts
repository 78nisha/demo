
import { Component } from '@angular/core';
import { NavController, NavParams, Platform} from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { HttpClient} from '@angular/common/http';
import { Http} from '@angular/http';
import { FeesDetailService } from './feesdetail.service';
import {Storage} from '@ionic/Storage';
import { NepaliDate } from 'nepali-date';
@Component({
  selector: 'page-feesdetail',
  templateUrl: 'feesdetail.html',
  providers: [ FeesDetailService]
})
export class FeesDetailPage {
  id;
  nepaliYear;
  fiscalyear = [];
  year;
  reverseYear;
  feeInfo = [];
  feedetail =[];
  feesDetailData = [];
  month;
  profileData;
  firstName;
  lastName;
  constructor(public platform: Platform, public navCtrl: NavController,public navParams: NavParams,public storage: Storage,private feesService: FeesDetailService,public http: Http,public httpClient: HttpClient) {
    platform.ready().then(()=>{
      platform.registerBackButtonAction(() => {
                   this.navCtrl.setRoot(HomePage);
           });
   })
    
 //-------------------------------To get Latest Fiscal Year and name from localstorage -----------------------------
 
   this.year = localStorage.getItem('fiscalYear');
   console.log(this.year);

   this.reverseYear = this.year.replace('/','.');
   console.log(this.reverseYear);

   this.id = localStorage.getItem('name');
    console.log(this.id);
     //-------------------------------To get student profile detail--------------------------------
   this.feesService.getProfile(this.id).subscribe((data: any)=> {
      console.log(data);
      this.profileData = data;
      this.firstName = this.profileData[0].firstName;
      this.lastName = this.profileData[0].lastName;
      console.log(this.firstName);     
      });
    //-------------------------------To get student fees detail-----------------------------
   this.feesService.getFeesDetail(this.reverseYear,this.id).subscribe((data: any)=> {
      console.log(data); 
      this.feeInfo = data;
       this.month = navParams.get('month')
      console.log(this.month); 
      for(var i=0; i<this.feeInfo.length; i++){
       if(this.feeInfo[i].month == this.month){
         this.feesDetailData.push({
           'firstName': this.firstName,
           'lastName':this.lastName,
           'year': this.year,
           'month': this.feeInfo[i].month,
           'fine': this.feeInfo[i].fine,
           'annualFee':(this.feeInfo[i].annualFee) + (this.feeInfo[i].admissionFee),
           'monthlyFee':(this.feeInfo[i].tutionFee) + (this.feeInfo[i].transportationFee) + (this.feeInfo[i].miscelleneousAmount) + (this.feeInfo[i].eca) + (this.feeInfo[i].lunch) + (this.feeInfo[i].support),
           'total': (this.feeInfo[i].fine) + (this.feeInfo[i].annualFee) + (this.feeInfo[i].admissionFee) + (this.feeInfo[i].tutionFee) + (this.feeInfo[i].transportationFee) + (this.feeInfo[i].miscelleneousAmount) + (this.feeInfo[i].eca) + (this.feeInfo[i].lunch) + (this.feeInfo[i].support)
         })
       }
     } 
     console.log(this.feesDetailData);
      });
  
  }
 
}
