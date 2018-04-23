import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LocksComponent} from './locks/locks.component';
import { StoveComponent } from './stove/stove.component';
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {path: 'locks', component: LocksComponent },
    {path: 'stove', component: StoveComponent }
    
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);