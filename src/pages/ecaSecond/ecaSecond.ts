import { Component } from '@angular/core';
import { NavController, Platform, LoadingController} from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { HttpClient} from '@angular/common/http';
import { Http} from '@angular/http';
import { EcaSecondService } from './ecaSecond.service';
import {Storage} from '@ionic/Storage';

@Component({
  selector: 'page-ecasecond',
  templateUrl: 'ecasecond.html',
  providers: [ EcaSecondService]
})
export class EcaSecondPage {
  id;
  nepaliYear;
  ecareport =[];
  constructor(public platform: Platform, public navCtrl: NavController, public loadingController:LoadingController,public storage: Storage,private ecaService: EcaSecondService,public http: Http,public httpClient: HttpClient) {
  
  //-------------------------------To get current year------------------------------------
  // const NepaliDate = require('nepali-date');
  // this.nepaliYear = new NepaliDate(new Date()).year;
  //  console.log(this.nepaliYear);
  platform.ready().then(()=>{
      platform.registerBackButtonAction(() => {
                   this.navCtrl.setRoot(HomePage);
           });
   })
  
  this.nepaliYear = localStorage.getItem('nepaliYear')

  this.id = localStorage.getItem('sid');
  console.log(this.id);

 //-------------------------------To get student ECA result detail--------------------------
  let load = this.loadingController.create({content : "Please...", spinner: 'crescent'}); // Show loading until user get response
   load.present();
  this.ecaService.getECADetail(this.id,this.nepaliYear).subscribe((data: any)=> {
      console.log(data); 
      load.dismissAll();
      this.ecareport = data;  
      });
  }
}
