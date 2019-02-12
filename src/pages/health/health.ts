
import { Component } from '@angular/core';
import { NavController, Platform, LoadingController} from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { HttpClient} from '@angular/common/http';
import { Http} from '@angular/http';
import { HealthService } from './health.service';
import {Storage} from '@ionic/Storage';

@Component({
  selector: 'page-health',
  templateUrl: 'health.html',
  providers: [ HealthService]
})
export class HealthPage {

  healthLog; //ngmodel name of segment used in html
  name;
  health = [];
  healthData = [];
  vaccine = [];
  checkup = [];
  hospital = [];

  constructor(public platform: Platform, public navCtrl: NavController, public loadingController:LoadingController,public storage: Storage,private healthService: HealthService,public http: Http,public httpClient: HttpClient) {
  
   platform.ready().then(()=>{
       platform.registerBackButtonAction(() => {
                    this.navCtrl.setRoot(HomePage);
            });
    })
  //------------------------To show predefined HEALTH data in HTML-------------------------
  this.healthLog = "health";

  this.name = localStorage.getItem('name');
  console.log(this.name);

  //-------------------------------To get student health detail--------------------------
   this.healthService.getProfile(this.name).subscribe((data: any)=> {
      console.log(data); 
      this.health = data;
      for(var i=0; i<this.health[i].length; i++){
      this.healthData.push({
        'bloodGroup':this.healthData[i].bloodGroup,
        'allergy':this.healthData[i].allergy,
        'illness':this.healthData[i].illness,
        'traumaticExperience':this.healthData[i].traumaticExperience,
        'specialNeed':this.healthData[i].specialNeed
        })
      }
      console.log(this.healthData);
     });
   //-------------------------------To get student Vaccination detail----------------------
   this.healthService.getVaccinationInfo(this.name).subscribe((data: any)=> {
      console.log(data);
      this.vaccine = data;   
      });
   //-------------------------------To get student Checkup detail--------------------------
   this.healthService.getCheckupLogInfo(this.name).subscribe((data: any)=> {
      console.log(data); 
      this.checkup = data;  
      });
    //-------------------------------To get student Hospitilization detail------------------
   this.healthService.getHospitalizationInfo(this.name).subscribe((data: any)=> {
      console.log(data); 
      this.hospital =data;  
      });
  }
}
