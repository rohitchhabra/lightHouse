import { Component, OnInit } from '@angular/core';
import { StoveService } from "./services/stove.service";

@Component({
  selector: 'app-stove',
  templateUrl: './stove.component.html',
  styleUrls: ['./stove.component.css']
})
export class StoveComponent implements OnInit {
locks:any[];
  constructor(public stoveService:StoveService) { }

  ngOnInit() {

    this.stoveService.getStoveDetail().subscribe(
      (res)=>{

        this.locks=res;
        console.log(res);

      }
    )
  }

}
