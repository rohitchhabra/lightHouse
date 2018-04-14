import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { routing } from './app.router';
import { LocksComponent } from './locks/locks.component';
import { LockService } from "./locks/services/lock.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LocksComponent
  ],
  imports: [HttpModule,
    BrowserModule,
    routing
  ],
  providers: [LockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
