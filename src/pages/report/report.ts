import { Component } from '@angular/core';
import { NavController, Platform,LoadingController} from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { EcaPage } from '../../pages/eca/eca';
import { EcaSecondPage } from '../../pages/ecasecond/ecasecond';
import { EcaThirdPage } from '../../pages/ecathird/ecathird';
import { HttpClient} from '@angular/common/http';
import { Http} from '@angular/http';
import { ReportService } from './report.service';
import {Storage} from '@ionic/Storage';

@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
  providers: [ ReportService]
})
export class ReportPage {
  id;
  nepaliYear;

  firstTerm;
  firstTermInfo = [];
  firstTermData = [];
  firstTermId =0;
  firstTermSubject = [];

  reportLog;
  reportId = 0;

  secondTermId =0;
  secondTerm = [];
  secondTermData = [];
  secondTermSubject = [];

  thirdTermId =0;
  thirdterm = [];
  thirdTermData = [];
  thirdTermSubject = [];

  firstTermtotalGrade;
  secondTermtotalGrade;
  thirdTermtotalGrade;
  firstTermAveragePoint;
  secondTermAveragePoint;
  thirdTermAveragePoint;
  cumulativeAveragePoint;

  public buttonClicked: boolean = false;
  shownGroup = null;
  constructor(public platform: Platform, public navCtrl: NavController, public loadingController:LoadingController,public storage: Storage,private reportService: ReportService,public http: Http,public httpClient: HttpClient) {
  platform.ready().then(()=>{
      platform.registerBackButtonAction(() => {
                   this.navCtrl.setRoot(HomePage);
           });
   })
  
  //-------------------------------To get current year------------------------------------
  // const NepaliDate = require('nepali-date');
  // this.nepaliYear = new NepaliDate(new Date()).year;
  //  console.log(this.nepaliYear);
  
  this.nepaliYear = localStorage.getItem('nepaliYear')

  this.id = localStorage.getItem('sid');
  console.log(this.id);

  this.reportLog = "firstTerm";

  //-------------------------------To get student 1st result detail--------------------------
   // let load = this.loadingController.create({content : "Please...", spinner: 'crescent'}); // Show loading until user get response
   // load.present();
   this.reportService.get1stResultDetail(this.nepaliYear,this.id).subscribe((detail: any)=> {
    console.log(detail); 
    // load.dismissAll();
    this.firstTermInfo = detail; 
     for(var i=0; i<this.firstTermInfo.length; i++){
    this.firstTermData.push({
           'id': this.firstTermId +=1,
           'unitTest':this.firstTermInfo[i].unitTest,
           'cas':this.firstTermInfo[i].cas,
           'termEnd':this.firstTermInfo[i].termEnd,
           'total':this.firstTermInfo[i].total,
           'grade':this.firstTermInfo[i].grade.grade,
           'gradePoint':this.firstTermInfo[i].grade.gradePoint,
           'subjectTitle':this.firstTermInfo[i].subjectTitle,
         });
  }

   let total = 0;
   var average;
    for (var j = 0; j < this.firstTermInfo.length; j++) {
      this.firstTermSubject.push(this.firstTermInfo[j].subjectTitle);
      console.log(this.firstTermSubject);
      total = total + this.firstTermInfo[j].grade.gradePoint;
      this.firstTermtotalGrade = total;
      average = (this.firstTermtotalGrade)/this.firstTermSubject.length;
      this.firstTermAveragePoint = average.toFixed(1);
    }
    console.log(this.firstTermtotalGrade); 
    console.log(average); 
     console.log(this.firstTermAveragePoint);
 
  //-------------------------------To get student 2nd result detail--------------------------
  // this.secondTermId +=1;
  this.reportService.get2ndResultDetail(this.nepaliYear,this.id).subscribe((data: any)=> {
     console.log(data);
     this.secondTerm = data; 
     for(var i=0; i<this.firstTermData.length; i++){
       for(var j=0; j<this.secondTerm.length; j++){
         if(this.firstTermData[i].subjectTitle == this.secondTerm[j].subjectTitle){
         this.secondTermData.push({
           'id': this.secondTermId +=1,
           'firstTermGrade': this.firstTermData[i].gradePoint,
           'unitTest':this.secondTerm[j].unitTest,
           'cas':this.secondTerm[j].cas,
           'termEnd':this.secondTerm[j].termEnd,
           'total':this.secondTerm[j].total,
           'grade':this.secondTerm[j].grade.grade,
           'gradePoint':this.secondTerm[j].grade.gradePoint,
           'subjectTitle':this.secondTerm[j].subjectTitle,

         });
        }
       }
     }

   let total = 0;
   var average;
    for (var i = 0; i < this.secondTerm.length; i++) {
      this.secondTermSubject.push(this.secondTerm[i].subjectTitle);
      total = total + this.secondTerm[i].grade.gradePoint;
      this.secondTermtotalGrade = total;
      average = (this.secondTermtotalGrade)/this.secondTermSubject.length;
      this.secondTermAveragePoint = average.toFixed(1);
    }
    console.log(this.secondTermtotalGrade); 
    console.log(average); 
    console.log(this.secondTermAveragePoint);
    console.log(this.secondTermData);
     
  //-------------------------------To get student 3rd result detail--------------------------
  this.reportService.get3rdResultDetail(this.nepaliYear,this.id).subscribe((data: any)=> {
    console.log(data);  
    this.thirdterm = data; 
       for(var j=0; j<this.secondTermData.length; j++){
         for(var z=0; z<this.thirdterm.length; z++){
         if(this.secondTermData[j].subjectTitle == this.thirdterm[z].subjectTitle){
         this.thirdTermData.push({
           'id': this.thirdTermId +=1,
           'firstTermGrade': this.secondTermData[j].firstTermGrade,
           'secondTermGrade': this.secondTermData[j].gradePoint,
           'unitTest':this.thirdterm[z].unitTest,
           'cas':this.thirdterm[z].cas,
           'termEnd':this.thirdterm[z].termEnd,
           'total':this.thirdterm[z].total,
           'grade':this.thirdterm[z].grade.grade,
           'gradePoint':this.thirdterm[z].grade.gradePoint,
           'subjectTitle':this.thirdterm[z].subjectTitle,
           });
        }
       }
     }
     console.log(this.secondTermData);
     console.log(this.thirdTermData);

    let total = 0;
    var average;
    for (var i = 0; i < this.thirdterm.length; i++) {
      this.thirdTermSubject.push(this.thirdterm[i].subjectTitle);
      total = total + this.thirdterm[i].grade.gradePoint;
      this.thirdTermtotalGrade = total;
      average = (this.thirdTermtotalGrade)/this.thirdTermSubject.length;
      this.thirdTermAveragePoint = average.toFixed(1);
    }
    console.log(this.thirdTermtotalGrade); 
    console.log(average); 
    console.log(this.thirdTermAveragePoint);

     var a  = parseFloat(this.firstTermAveragePoint);
     console.log(a);
     var b  = parseFloat(this.secondTermAveragePoint);
     console.log(b);
     var c  = parseFloat(this.thirdTermAveragePoint);
     console.log(c);
     var GPATotal = (a + b + c);
     console.log(GPATotal);
     var CGPA = (GPATotal)/3
     this.cumulativeAveragePoint = CGPA.toFixed(1);
     console.log(this.cumulativeAveragePoint);   
       });
    });
   });
  }

 viewFirstReport(){
   this.navCtrl.push(EcaPage);
 }

 viewSecondReport(){
   this.navCtrl.push(EcaSecondPage);
 }
 viewThirdReport(){
   this.navCtrl.push(EcaThirdPage);
 }
 
 onButtonClick(idValue) {
   console.log(idValue);
      document.getElementById("i" + idValue).style.display = "block";
  }
  hide(value){
    document.getElementById("i" + value).style.display = "none";
  }

  onButtonClick1st(idValue){
     document.getElementById("i" + idValue).style.display = "block";
  }
  onButtonClick3rd(idValue){
     document.getElementById("i" + idValue).style.display = "block";
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
    }
  };
isGroupShown(group) {
    return this.shownGroup === group;
  };
}
