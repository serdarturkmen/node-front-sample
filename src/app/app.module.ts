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
import { UsersComponent } from './users/users.component';
import { ChatComponent } from './chat/chat/chat.component';
import { MessageComponent } from './chat/message/message.component';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {EmojiPickerModule} from 'ng2-emoji-picker';
import {MapComponent} from './map/map.component';
import {AgmCoreModule} from '@agm/core';
import {GooglePlaceModule} from 'ngx-google-places-autocomplete';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

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
    UsersComponent,
    ChatComponent,
    MessageComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCUBfsf6BvjM5-iK7ISJwbZ9XudjrWResg',
      libraries: ['geometry']
    }),
    NgxWebstorageModule.forRoot({ prefix: 'dating', separator: '-' }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    GooglePlaceModule,
    EmojiPickerModule.forRoot(),
    SocketIoModule.forRoot(config)
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
