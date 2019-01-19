import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import {ProductService} from './services/product.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ProductAddComponent } from './products/product-add/product-add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {UserService} from './services/user.service';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {AppState} from './util/app.service';
import {APP_RESOLVER_PROVIDERS} from './util/app.resolver';
import {AuthInterceptor} from './util/auth.interceptor';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './sign-up/register.component';

const APP_PROVIDERS = [...APP_RESOLVER_PROVIDERS, AppState];

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductAddComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxWebstorageModule.forRoot({ prefix: 'dating', separator: '-' }),
  ],
  providers: [ProductService, UserService,
    APP_PROVIDERS,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'de' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
