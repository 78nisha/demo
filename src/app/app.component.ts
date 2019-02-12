import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App, AlertController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AcademicsPage } from '../pages/academics/academics';
import { FeesPage } from '../pages/fees/fees';
import { ReportPage } from '../pages/report/report';
import { LoginPage } from '../pages/login/login';
import { HealthPage } from '../pages/health/health';
import {Storage} from '@ionic/Storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  private homePage;
  private academicsPage;
  private reportPage;
  private healthPage;
  private feesPage;
  pages: Array<{title: string, component: any}>;
  public counter=0;
  constructor(public app: App, public alert: AlertController, public platform: Platform,public storage: Storage,public statusBar: StatusBar, public splashScreen: SplashScreen) {
    platform.ready().then(() => {
      
      // statusBar.styleDefault();

      // statusBar.overlaysWebView(true);

      statusBar.backgroundColorByHexString('#C71585');
      splashScreen.hide();

      if(localStorage.getItem('name')){
        this.app.getRootNav().setRoot(HomePage);
      }
      else{
        this.app.getRootNav().setRoot(LoginPage);
      }
    });
    this.initializeApp();

    // used for an example of ngFor and navigation
    // this.pages = [
    //   { title: 'DASHBOARD', component: HomePage },
    //   { title: 'ACADEMICS', component: AcademicsPage },
    //   { title: 'REPORT CARD', component: ReportPage },
    //   { title: 'HEALTH', component: HealthPage },
    //   { title: 'FEE/ACCOUNTS', component: FeesPage }
    // ];
    this.homePage = HomePage;
    this.academicsPage = AcademicsPage;
    this.reportPage = ReportPage;
    this.healthPage= HealthPage;
    this.feesPage = FeesPage

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
    });
  }

  // openPage(page) {
  //   // Reset the content nav to have just this page
  //   // we wouldn't want the back button to show in this scenario
  //   this.nav.setRoot(page.component);
  // }
  openPage(page) {
    // this.rootPage = page;
    if(page == this.homePage){
      this.nav.setRoot(HomePage);
    }
     if(page == this.academicsPage){
      this.nav.push(AcademicsPage);
    }
     if(page == this.reportPage){
      this.nav.push(ReportPage);
    }
     if(page == this.healthPage){
      this.nav.push(HealthPage);
    }
     if(page == this.feesPage){
      this.nav.push(FeesPage);
    }
  }
  logout(){
    // localStorage.clear();
    // this.platform.exitApp();
    // this.nav.setRoot(LoginPage);

     let alert = this.alert.create({
        title: 'Confirm',
        message: 'Do you want to Logout?',
        buttons: [{
          text: "Yes",
          handler: () => { this.exitApp() }
        }, {
          text: "Cancel",
          role: 'cancel'
        }]
      })
      alert.present();
    
  }

  exitApp(){
     localStorage.clear();
    this.platform.exitApp();
  }
}
