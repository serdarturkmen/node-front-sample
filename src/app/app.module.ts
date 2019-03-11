import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import {ProductService} from './services/product.service';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { ProductAddComponent } from './products/product-add/product-add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {UserService} from './services/user.service';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {AppState} from './util/app.service';
import {APP_RESOLVER_PROVIDERS} from './util/app.resolver';
import {AuthInterceptor} from './util/auth.interceptor';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {AuthServiceConfig, FacebookLoginProvider, LoginOpt, SocialLoginModule} from 'angularx-social-login';
import {FaceLoginComponent} from './face-login/face-login.component';

const fbLoginOptions: LoginOpt = {
  scope: 'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages',
  return_scopes: true,
  enable_profile_selector: true
};

const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('587721945080110', fbLoginOptions)
  }
]);
export function provideConfig() {
  return config;
}

const APP_PROVIDERS = [...APP_RESOLVER_PROVIDERS, AppState];
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/api/langs/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductAddComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    FaceLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SocialLoginModule,
    NgxWebstorageModule.forRoot({ prefix: 'dating', separator: '-' }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [ProductService, UserService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
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
