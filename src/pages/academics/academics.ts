
import { Component } from '@angular/core';
import { NavController, Platform, LoadingController} from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { HttpClient} from '@angular/common/http';
import { Http} from '@angular/http';
import { AcademicsService } from './academics.service';
import {Storage} from '@ionic/Storage';
import { NepaliDate } from 'nepali-date';

@Component({
  selector: 'page-academics',
  templateUrl: 'academics.html',
  providers: [ AcademicsService]
})
export class AcademicsPage {
  id;
  nepaliYear;

  fiscalyear;

  fiscalyearData = [];
  firstTerm;
  secondTerm;
  thirdTerm;
 
  fiscalyearDataSummary = [];
  firstTermSummary;
  secondTermSummary;
  thirdTermSummary;

  studentId;
  internal = [];
  external = [];
  academicsLog;
 
 //----------------------For Chart-------------------------------------------
  marks_record1 = [];
  marks_record2 = [];
  marks_record3 = [];
  total_record1 = [];
  total_record2 = [];
  total_record3 = [];

  type1;
  data1;
  options1;

  type2;
  data2;
  options2;
  label =[];
  data = [];

  sub1st = [];
  data1st = [];

  sub2nd = [];
  data2nd = [];

  sub3rd = [];
  data3rd = [];

  firstCas = [];
  secondCas = [];
  thirdCas = [];
  firstSub = [];
  secondSub = [];
  thirdSub = [];
  
  constructor(public platform: Platform, public navCtrl: NavController, public loadingController:LoadingController, public storage: Storage,private academicsService: AcademicsService,public http: Http,public httpClient: HttpClient) {
   
   platform.ready().then(()=>{
      platform.registerBackButtonAction(() => {
                   this.navCtrl.setRoot(HomePage);
           });
   })
   
  this.academicsLog = "progress";
  //-------------------------------To get current year------------------------------------
  // const NepaliDate = require('nepali-date');
  // this.nepaliYear = new NepaliDate(new Date()).year;
  //  console.log(this.nepaliYear);
  this.nepaliYear = localStorage.getItem('nepaliYear')

  this.id = localStorage.getItem('sid');
  console.log(this.id);

   this.studentId = localStorage.getItem('name');
  console.log(this.studentId);
 
  // this.academicsService.getFiscalYear().subscribe((data: any)=> {  
  //     this.fiscalyear = data;
  //   });
  }

   onChangeYear(yearValue) {
     this.marks_record3.length = 0;
     this.fiscalyearData = yearValue;
    
   //-------------------------------To get student 1st result detail--------------------------
    let load = this.loadingController.create({content : "Please...", spinner: 'crescent'}); // Show loading until user get response
    load.present();
    this.academicsService.get1stResultDetail(this.fiscalyearData,this.id).subscribe((detail: any)=> {
    console.log(detail); 
    load.dismissAll();  
    this.firstTerm = detail;
  
    // for(var i=0; i<this.firstTerm.length; i++){
    //    this.marks_record1.push({
    //     'label': this.firstTerm[i].subjectTitle,
    //      'data': this.firstTerm[i].cas
    //   });
    //  }
  
     // console.log(this.marks_record1);
   //-------------------------------To get student 2nd result detail--------------------------
    this.academicsService.get2ndResultDetail(this.fiscalyearData,this.id).subscribe((detail: any)=> {
    console.log(detail);   
    this.secondTerm = detail;

    // for(var i=0; i<this.secondTerm.length; i++){
    //   for(var j =0; j<this.firstTerm.length; j++){
    //   if(this.firstTerm[j].subjectTitle == this.secondTerm[i].subjectTitle){
    //     console.log("Success")
    //    this.marks_record2.push({
    //     'label': this.secondTerm[i].subjectTitle,
    //      'data': [this.firstTerm[j].cas,this.secondTerm[i].cas]
    //         });
    //       }
    //     }
    //   }
     //console.log(this.marks_record2);
  //-------------------------------To get student 3rd result detail--------------------------
    this.academicsService.get3rdResultDetail(this.fiscalyearData,this.id).subscribe((detail: any)=> {
    console.log(detail);   
    this.thirdTerm = detail;

    var randomColor = ['#D3E2E2','#D9F7F7','#BFE6E6','#B9F6F6','#86B9B9','#7FA7A7','#65A4A4','#508181','#8CF6F6','#6FF8F8','#2DF8F8','#8FD5D5','#2F9E9E'];
     for(var i=0; i<this.firstTerm.length; i++){
      for(var j =0; j<this.secondTerm.length; j++){
        for(var z=0; z<this.thirdTerm.length; z++){
      if(this.firstTerm[i].subjectTitle == this.secondTerm[j].subjectTitle && this.secondTerm[j].subjectTitle == this.thirdTerm[z].subjectTitle){
        console.log("Success")
       this.marks_record3.push({ 
         'data': [this.firstTerm[i].cas,this.secondTerm[j].cas,this.thirdTerm[z].cas],
         'label': this.thirdTerm[z].subjectTitle,
         'backgroundColor': randomColor[i]
            });

         }
        }
       }
      }
      
      
      console.log(this.marks_record3);
      var info = this.marks_record3;
      this.type1 = 'bar';
          this.data1 = {

            labels: ["First Term","Second Term", "Third Term"],
            datasets: info
            
          };

           this.options1 = {
         responsive: true,
         maintainAspectRatio: false,  
         };
      });  
    });
  });   
}

 onChangeYearSummary(yearValue) {

  this.total_record3.length = 0; 
  this.fiscalyearDataSummary = yearValue;
    
   //-------------------------------To get student 1st result detail--------------------------
    this.academicsService.get1stResultDetail(this.fiscalyearDataSummary,this.id).subscribe((detail: any)=> {
    console.log(detail);   
    this.firstTermSummary = detail;
    // for(var i=0; i<this.firstTermSummary.length; i++){
    //   this.total_record1.push({
    //     'label': this.firstTermSummary[i].subjectTitle,
    //     'data': this.firstTermSummary[i].total
    //   });
    //   }
     //console.log(this.total_record1);
   //-------------------------------To get student 2nd result detail--------------------------
    this.academicsService.get2ndResultDetail(this.fiscalyearDataSummary,this.id).subscribe((detail: any)=> {
    console.log(detail);   
    this.secondTermSummary = detail;
    // for(var i=0; i<this.firstTermSummary.length; i++){
    // for(var j=0; j<this.secondTermSummary.length; j++){
    //   if(this.firstTermSummary[i].subjectTitle ==  this.secondTermSummary[j].subjectTitle){
    //   this.total_record2.push({
    //     'label': this.secondTermSummary[j].subjectTitle,
    //     'data': [this.firstTermSummary[i].total,this.secondTermSummary[i].total]
    //       });
    //     }
    //   }
    // }
     //console.log(this.total_record2);

  //-------------------------------To get student 3rd result detail--------------------------
    this.academicsService.get3rdResultDetail(this.fiscalyearDataSummary,this.id).subscribe((detail: any)=> {
    console.log(detail);   
    this.thirdTermSummary = detail;
    var randomColor = ['#D3E2E2','#D9F7F7','#BFE6E6','#B9F6F6','#86B9B9','#7FA7A7','#65A4A4','#508181','#8CF6F6','#6FF8F8','#2DF8F8','#8FD5D5','#2F9E9E'];
    for(var i=0; i<this.firstTermSummary.length; i++){
    for(var j=0; j<this.secondTermSummary.length; j++){
    for(var z=0; z<this.thirdTermSummary.length; z++){
     if(this.firstTermSummary[i].subjectTitle == this.secondTermSummary[j].subjectTitle && this.secondTermSummary[j].subjectTitle == this.thirdTermSummary[z].subjectTitle){
        console.log("Success") 
      this.total_record3.push({
        'label': this.thirdTermSummary[z].subjectTitle,
        'data': [this.firstTermSummary[i].total,this.secondTermSummary[j].total,this.thirdTermSummary[z].total],
        'backgroundColor': randomColor[i]
          });
        }      
      }
    }
  }
    console.log(this.total_record3);
     var info = this.total_record3
     this.type2 = 'bar';
          this.data2 = {
           labels: ["First Term","Second Term", "Third Term"],
            datasets: info                               
          };
           this.options2 = {
         responsive: true,
         maintainAspectRatio: false,  
         };

      });  
    });
  });   
}

onChange(value){
 console.log(value);
 this.internal.length = 0;
 this.external.length = 0;
  if(value == 'internal'){
  //-------------------------------To get student ECA result detail--------------------------
  this.academicsService.getInternalDetail(this.studentId,this.nepaliYear).subscribe((data: any)=> {
      console.log(data); 
      this.internal = data;
      });

  }
  if(value == 'external'){
  //-------------------------------To get student ECA result detail--------------------------
  this.academicsService.getExternalDetail(this.studentId,this.nepaliYear).subscribe((data: any)=> {
      console.log(data); 
      this.external = data;
      }); 
  }

}

}
