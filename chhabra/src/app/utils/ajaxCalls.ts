import { Http, Response,Headers } from '@angular/http';

export class AjaxCalls{
		
	  static httpPostCall=function(reqObj:any,url:any,http:any){
		//console.log("request:- "+reqObj);
		var headers=new Headers();
  	  	headers.append('Content-Type','application/json');
  	  	return http.post(url,reqObj,{headers: headers}).map((res:any)=>res.json());	
	}


}