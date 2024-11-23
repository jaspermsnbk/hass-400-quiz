import { Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { TestComponent } from './app/test/test.component';
import { animation } from '@angular/animations';

export const routes: Routes = [
    {path:'test', component:TestComponent},
    {path:'', component: HomeComponent},
];
