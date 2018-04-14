import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class LockService {

   constructor(private http: Http) { }

   getLockDetail(){
      let apiUrl = './../../assets/lock.json';
      return this.http.get(apiUrl)
      .map( (response: Response) => {
         const data = response.json();
         return data;
      });
   }  
}
