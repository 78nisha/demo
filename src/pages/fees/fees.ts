
import { Component } from '@angular/core';
import { NavController,Platform, LoadingController} from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { HttpClient} from '@angular/common/http';
import { Http} from '@angular/http';
import { FeesService } from './fees.service';
import {Storage} from '@ionic/Storage';
import { NepaliDate } from 'nepali-date';
import { FeesDetailPage } from '../../pages/feesdetail/feesdetail';
@Component({
  selector: 'page-fees',
  templateUrl: 'fees.html',
  providers: [ FeesService]
})

export class FeesPage {
  id;
  nepaliYear;
  fiscalyear = [];
  year;
  fisyear;
  reverseYear;
  feeInfo;
  feedetail =[];
  feeLog;
  profileData;
  firstName;
  lastName;
  receipt =[];
  receiptData = [];
  totalamount;
  modeOfPayment = [];
  due;
  spliceYear;
  constructor(public platform: Platform, public navCtrl: NavController, public loadingController:LoadingController, public storage: Storage,private feesService: FeesService,public http: Http,public httpClient: HttpClient) {
   platform.ready().then(()=>{
      platform.registerBackButtonAction(() => {
                   this.navCtrl.setRoot(HomePage);
           });
   })
   
  //------------------------To show predefined HEALTH data in HTML-------------------------
  this.feeLog = "detail";
  //-------------------------------To get current year----------------------------------
  // const NepaliDate = require('nepali-date');
  // this.nepaliYear = new NepaliDate(new Date()).year;
  // console.log(this.nepaliYear);

  // this.nepaliYear = localStorage.getItem('nepaliYear')

  this.fisyear = localStorage.getItem('fiscalYear');
  console.log(this.fisyear);

  this.id = localStorage.getItem('name');
  console.log(this.id);
 //-------------------------------To get Latest Fiscal Year-----------------------------
   let load = this.loadingController.create({content : "Please...", spinner: 'crescent'}); // Show loading until user get response
   load.present();
   this.feesService.getFiscalYear().subscribe((data: any)=> {
      console.log(data);
      load.dismissAll();
      this.fiscalyear = data[0].year;
      console.log(this.fiscalyear);
      this.year = this.fiscalyear; 
      localStorage.setItem('fiscalYear', this.year);
      this.reverseYear = this.year.replace('/','.');
      console.log(this.reverseYear);

    //-------------------------------To get student fees detail-----------------------------
   this.feesService.getFeesDetail(this.reverseYear,this.id).subscribe((data: any)=> {
      console.log(data); 
      this.feeInfo = data;  
      for(var i=0; i<this.feeInfo.length; i++){
        this.feedetail.push({
          'month': this.feeInfo[i].month,
        });
      }
      console.log(this.feedetail);
      });
  //-------------------------------To get student fees receipt detail----------------------
   this.feesService.getFeesReceiptDetail(this.reverseYear,this.id).subscribe((data: any)=> {
      console.log(data);   
      this.receipt = data;
      for(var i=0; i<this.receipt.length; i++){
      this.receiptData.push({
       'year': this.year,
       'month': this.receipt[i].month,
       'recievedAmount': this.receipt[i].recievedAmount,
       'modeOfPayment': this.receipt[i].modeOfPayment.charAt(0).toUpperCase() + this.receipt[i].modeOfPayment.substring(1).toLowerCase(),
       'remarks': this.receipt[i].remarks
       })

      }
      console.log(this.receiptData);
      let total = 0;
    for (var i = 0; i < this.receiptData.length; i++) {
       total = total + parseInt(this.receiptData[i].recievedAmount);
       this.totalamount = total;
    }
    console.log(this.totalamount);
     });
    });
  //-------------------------------To get student profile detail--------------------------------
   this.feesService.getFeesDueDetail(this.id).subscribe((data: any)=> {
      console.log(data);
      this.due = data.due;
      console.log(this.due);     
      });  
  //-------------------------------To get student profile detail--------------------------------
   this.feesService.getProfile(this.id).subscribe((data: any)=> {
      console.log(data);
      this.profileData = data;
      this.firstName = this.profileData[0].firstName;
      this.lastName = this.profileData[0].lastName;
      console.log(this.firstName);     
      }); 
  }
  getValue(value){
    console.log(value);
    this.navCtrl.push(FeesDetailPage,{month: value});
  }
}
