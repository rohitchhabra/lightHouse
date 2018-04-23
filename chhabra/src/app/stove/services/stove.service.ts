import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class StoveService {

   constructor(private http: Http) { }

   getStoveDetail(){
      let apiUrl = './../../assets/stove.json';
      return this.http.get(apiUrl)
      .map( (response: Response) => {
         const data = response.json();
         return data;
      });
   }  
}
