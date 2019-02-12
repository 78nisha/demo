import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { HttpClient} from '@angular/common/http';
import { Http} from '@angular/http';
import { ProfileService } from './profile.service';
import {Storage} from '@ionic/Storage';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [ ProfileService]
})
export class ProfilePage {
  name;
  sid;
  profileData;
  constructor(public navCtrl: NavController,public storage: Storage,private profileService: ProfileService,public http: Http,public httpClient: HttpClient) {
  this.name = localStorage.getItem('name');
  console.log(this.name);

  //-------------------------------To get student profile detail--------------------------------
   this.profileService.getProfile(this.name).subscribe((data: any)=> {
      console.log(data);
      this.profileData = data;
      console.log(data[0].sid);
      localStorage.setItem('sid',data[0].sid); 
      });
  }
}
