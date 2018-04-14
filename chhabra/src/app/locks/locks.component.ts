import { Component, OnInit } from '@angular/core';
import { LockService } from "./services/lock.service";

@Component({
  selector: 'app-locks',
  templateUrl: './locks.component.html',
  styleUrls: ['./locks.component.css']
})
export class LocksComponent implements OnInit {
locks:any[];
  constructor(public lockService:LockService) { }

  ngOnInit() {

    this.lockService.getLockDetail().subscribe(
      (res)=>{

        this.locks=res;
        console.log(res);

      }
    )
  }

}
