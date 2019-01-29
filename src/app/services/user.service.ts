import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IUser} from '../model/user.model';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

type EntityResponseType = HttpResponse<IUser>;
declare const FB:any;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly resourceUrl: string = '/user';

  constructor(private http: HttpClient,
              private $localStorage: LocalStorageService,
              private $sessionStorage: SessionStorageService) {
    FB.init({
      appId      : '587721945080110',
      cookie     : true,
      xfbml      : true,
      version    : 'v1.0'
    });
    this.resourceUrl = 'http://localhost:3000' + this.resourceUrl;
  }

  fbLogin() {
    return new Promise((resolve, reject) => {
      FB.login(result => {
        if (result.authResponse) {
          return this.http.post(`http://localhost:3000/facebook/login`, {access_token: result.authResponse.accessToken})
            .toPromise()
            .then(response => {
              console.log(response);
            })
            .catch(() => reject());
        } else {
          reject();
        }
      }, {scope: 'public_profile,email'})
    });
  }

  loginNormal(user: IUser): Observable<EntityResponseType> {
    return this.http
      .post<IUser>(`${this.resourceUrl}/login`, user, {observe: 'response'})
      .pipe(map(authenticateSuccess.bind(this)));

    function authenticateSuccess(resp) {
      const jwt = resp.body.token;
      if (jwt) {
        this.storeAuthenticationToken(jwt, false);
        return jwt;
      }
    }
  }

  storeAuthenticationToken(jwt, rememberMe) {
    if (rememberMe) {
      this.$localStorage.store('authenticationToken', jwt);
    } else {
      this.$sessionStorage.store('authenticationToken', jwt);
    }
  }

  signUp(user: IUser): Observable<EntityResponseType> {
    return this.http
      .post<IUser>(`${this.resourceUrl}/signUp`, user, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => res));
  }

  findAll<T>(): Observable<IUser[]> {
    return this.http
      .get<IUser[]>(this.resourceUrl, httpOptions);
  }

}
