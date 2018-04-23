import { Component, OnInit } from '@angular/core';
import { ICarouselConfig, AnimationConfig } from 'angular4-carousel';
import { FormGroup, FormControl, FormBuilder, Validators }        from '@angular/forms';
import { Http, Response,Headers } from '@angular/http';

declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  generatorForm : FormGroup;

  constructor(private http:Http, fBuilder:FormBuilder) {
    this.generatorForm = fBuilder.group({
      /**email     : ['', Validators.compose([Validators.required, CustomValidators.emailValidator])],*/
       fullName     : new FormControl('',[Validators.required]),
       city     : new FormControl('',[Validators.required]),
       state     : new FormControl('',[Validators.required]),
       address     : new FormControl('',[Validators.required]),
       contactNumber  : new FormControl('',[Validators.required])
      
  });
   }

  ngOnInit() {
  }



public imageSources: string[] = [
  '.,/../../../assets/images/logo.png',
  '.,/../../../assets/images/logo_burned.png',
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

public config: ICarouselConfig = {
 verifyBeforeLoad: true,
 log: false,
 animation: true,
 animationType: AnimationConfig.SLIDE,
 autoplay: true,
 autoplayDelay: 2000,
 stopAutoplayMinWidth: 768
};

hireGenerator(){
  console.log(this.generatorForm.controls.fullName.value)
}

}
