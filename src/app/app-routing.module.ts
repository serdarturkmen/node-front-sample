import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {ProductAddComponent} from './products/product-add/product-add.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './sign-up/register.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomeComponent},
  {path: 'products', pathMatch: 'full', component: ProductsComponent},
  {path: 'products/add', pathMatch: 'full', component: ProductAddComponent},
  {path: 'login', pathMatch: 'full', component: LoginComponent},
  {path: 'sign-up', pathMatch: 'full', component: RegisterComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
