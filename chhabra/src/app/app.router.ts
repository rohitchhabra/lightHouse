import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LocksComponent} from './locks/locks.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {path: 'locks', component: LocksComponent }
    
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);