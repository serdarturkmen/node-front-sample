import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IProduct} from '../model/product.model';

type EntityResponseType = HttpResponse<any>;
type EntityArrayResponseType = HttpResponse<any[]>;


@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private readonly resourceUrl: string = '/email/send';

  constructor(private http: HttpClient) {
    this.resourceUrl = 'http://localhost:3000' + this.resourceUrl;
  }

  sendEmail(email: any): Observable<EntityResponseType> {
    return this.http
      .post<IProduct>(this.resourceUrl, email, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => res));
  }

}
