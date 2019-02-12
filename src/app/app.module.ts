import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { IonicStorageModule } from '@ionic/Storage';
import { ChartModule  } from 'angular2-chartjs';
import { Chart } from 'chart.js';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AcademicsPage } from '../pages/academics/academics';
import { FeesPage } from '../pages/fees/fees';
import { FeesDetailPage } from '../pages/feesdetail/feesdetail';
import { ReportPage } from '../pages/report/report';
import { ListPage } from '../pages/list/list';
import { EcaPage } from '../pages/eca/eca';
import { EcaSecondPage } from '../pages/ecasecond/ecasecond';
import { EcaThirdPage } from '../pages/ecathird/ecathird';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { HealthPage } from '../pages/health/health';
import { FeedbackPage } from '../pages/feedback/feedback';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AcademicsPage,
    FeesPage,
    FeesDetailPage,
    ReportPage,
    LoginPage,
    ProfilePage,
    HealthPage,
    EcaPage,
    EcaSecondPage,
    EcaThirdPage,
    FeedbackPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    [ ChartModule ],
    IonicModule.forRoot(MyApp, { scrollAssist: false}),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AcademicsPage,
    FeesPage,
    FeesDetailPage,
    ReportPage,
    LoginPage,
    ProfilePage,
    HealthPage,
    EcaPage,
    EcaSecondPage,
    EcaThirdPage,
    FeedbackPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
