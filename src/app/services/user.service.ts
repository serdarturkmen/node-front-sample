import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IUser} from '../model/user.model';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

type EntityResponseType = HttpResponse<IUser>;

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
    this.resourceUrl = 'http://localhost:3000' + this.resourceUrl;
  }

  login(user: IUser): Observable<EntityResponseType> {
    return this.http
      .post<IUser>(`${this.resourceUrl}/login`, user, {observe: 'response'})
      .pipe(map(authenticateSuccess.bind(this)));

    function authenticateSuccess(resp) {
      const jwt = resp.body.token;
      if (jwt) {
        this.storeAuthenticationToken(jwt, user.rememberme);
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
