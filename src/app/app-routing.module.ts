import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {ProductAddComponent} from './products/product-add/product-add.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  { path: 'products', pathMatch: 'full', component: ProductsComponent },
  { path: 'products/add', pathMatch: 'full', component: ProductAddComponent },
  { path: 'login', pathMatch: 'full', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
