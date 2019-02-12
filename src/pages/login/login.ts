import { Component } from '@angular/core';
import { NavController, LoadingController, Platform, ToastController, AlertController} from 'ionic-angular';
import { LoginService } from './login.service';
import { HttpClient} from '@angular/common/http';
import { Http} from '@angular/http';
import { HomePage } from '../../pages/home/home';
import {Md5} from 'ts-md5/dist/md5';
import{FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Storage} from '@ionic/Storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [ LoginService]
})
export class LoginPage {
  myForm: FormGroup;
  token;
  login;

  constructor(public platform: Platform,public toastCtrl:ToastController, public alertCtrl:AlertController, public loadingController:LoadingController,public formbuilder: FormBuilder,public navCtrl: NavController, public loginService: LoginService,public http: Http,public httpClient: HttpClient) {
   
  //---------------------Form Validation-----------------------------------------------------
  this.myForm = formbuilder.group({
      'nameInput': ['', Validators.compose([Validators.required])],
      'passwordInput': ['', Validators.compose([Validators.required])],
    });
  }

  loginButton(name, pass){
    var username = name;
    var password = Md5.hashStr(pass); 
	 console.log(name, password);

	 var login = {
	 	username,
	 	password
	 }
	 console.log(login);
  //---------------------Loader until data hit API---------------------------------------------
    let loading = this.loadingController.create({content : "Logging in ,please wait..."});
    loading.present();
    //-----------------------------------------Login Post----------------------------------------
	 this.loginService.postLogIn(login).subscribe((response:any) => {
     console.log(response);
      loading.dismissAll();
     if(response.success == false){
       // alert('Please enter valid credentials');
        let prompt = this.alertCtrl.create({
      title: "Please enter valid credentials",
      buttons: ['OK'],
      cssClass: 'alertCustomCss'
    })
     prompt.present();
     }
     else{
       console.log(response.name);
       localStorage.setItem('name',response.name);
       localStorage.setItem('id',response.id);
       this.navCtrl.setRoot(HomePage);
     }
   });
  }
}