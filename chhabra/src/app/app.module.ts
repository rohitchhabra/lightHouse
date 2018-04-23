import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { routing } from './app.router';
import { LocksComponent } from './locks/locks.component';
import { LockService } from "./locks/services/lock.service";
import { StoveComponent } from './stove/stove.component';
import { StoveService } from "./stove/services/stove.service";

import { CarouselModule } from 'angular4-carousel';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LocksComponent,
    StoveComponent
  ],
  imports: [HttpModule,
    BrowserModule,
    routing,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [LockService,StoveService],
  bootstrap: [AppComponent]
})
export class AppModule { }
