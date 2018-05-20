import { Component, OnInit } from '@angular/core';
// import { ICarouselConfig, AnimationConfig } from 'angular4-carousel'
import { FormGroup, FormControl, FormBuilder, Validators }        from '@angular/forms';
import { Http, Response,Headers } from '@angular/http';
import {AjaxCalls} from '../utils/ajaxCalls';
import {AppConstants} from '../utils/appConstants';

declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  generatorForm : FormGroup;
  keyForm : FormGroup;

  constructor(private http:Http, fBuilder:FormBuilder) {
    this.generatorForm = fBuilder.group({
      /**email     : ['', Validators.compose([Validators.required, CustomValidators.emailValidator])],*/
       fullName     : new FormControl('',[Validators.required]),
       city     : new FormControl('',[Validators.required]),
       state     : new FormControl('',[Validators.required]),
       address     : new FormControl('',[Validators.required]),
       zipCode  : new FormControl('',[Validators.required]),
       contactNumber  : new FormControl('',[Validators.required])
  });
  this.keyForm = fBuilder.group({
    /**email     : ['', Validators.compose([Validators.required, CustomValidators.emailValidator])],*/
     fullName     : new FormControl('',[Validators.required]),
     city     : new FormControl('',[Validators.required]),
    // state     : new FormControl('',[Validators.required]),
    // address     : new FormControl('',[Validators.required]),
     zipCode  : new FormControl('',[Validators.required]),
     contactNumber  : new FormControl('',[Validators.required]),
     vehicleType  : new FormControl('',[Validators.required]),
     vehicleNumber  : new FormControl('',[Validators.required])
});
   }

  ngOnInit() {
  }



public imageSources: string[] = [
 // '.,/../../../assets/images/logo.png',
 // '.,/../../../assets/images/logo_burned.png',
  '../../assets/images/stoves/stove31.jpg',
  '../../assets/images/stoves/stove31-1.jpg',
  '../../assets/images/stoves/stove33.jpg',
  '../../assets/images/stoves/stove35.jpg',
  '../../assets/images/stoves/stove36.jpg',
  '../../assets/images/stoves/stove39.jpg',
  '../../assets/images/stoves/stove41.jpg',
  '../../assets/images/locks/lock11.jpg',
  '../../assets/images/locks/lock13.jpg',
  '../../assets/images/locks/lock14.jpg',
  '../../assets/images/locks/lock7.jpg',
  
];

// public config: ICarouselConfig = {
//  verifyBeforeLoad: true,
//  log: false,
//  animation: true,
//  animationType: AnimationConfig.SLIDE,
//  autoplay: true,
//  autoplayDelay: 2000,
//  stopAutoplayMinWidth: 768
// };

hireGenerator(){

  console.log(this.generatorForm.valid);

  console.log(this.generatorForm.controls.fullName.value)

    var reqjson=JSON.stringify(
      {
        "name": this.generatorForm.controls.fullName.value,
        "contactNumber": this.generatorForm.controls.contactNumber.value,
        "city": this.generatorForm.controls.city.value,
        "state": this.generatorForm.controls.state.value,
        "zipCode": this.generatorForm.controls.zipCode.value,
        "address": this.generatorForm.controls.address.value,
        "enquiryType": "gen"
      
      });

    AjaxCalls.httpPostCall(reqjson,AppConstants.baseUrl+"/enquiry",this.http).subscribe(
      (data:any) => {  
        console.log(data);
      },
    (error:any)=>{
      console.log("error");},	
    ()=>console.log("finished")
  );

}

keyService(form){
  console.log(this.keyForm.controls.fullName.value)
  var formValues =form.value;
    var reqjson=JSON.stringify(
      {
        "name": formValues.fullName,
        "contactNumber":  formValues.contactNumber,
        "city":  formValues.city,
       // "state": this.keyForm.controls.state.value,
        "zipCode":  formValues.zipCode,
       // "address": this.keyForm.controls.address.value,
       "vehicleType":  formValues.vehicleType,
       "vehicleNumber":  formValues.vehicleNumber,
        "enquiryType": "keys"
      
      });
console.log(reqjson);
    AjaxCalls.httpPostCall(reqjson,AppConstants.baseUrl+"/enquiry",this.http).subscribe(
      (data:any) => {  
        console.log(data);
      },
    (error:any)=>{
      console.log("error");},	
    ()=>console.log("finished")
  );

}


}
