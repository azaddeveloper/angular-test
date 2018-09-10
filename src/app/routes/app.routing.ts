import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { ProductComponent } from '../product/product.component';



const appRoutes: Routes = [
  { path: '', component: ProductComponent },  
  

];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);  