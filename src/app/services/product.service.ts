import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IProductArray} from '../model/product-array';
import {IProduct} from '../model/product.model';

type EntityResponseType = HttpResponse<IProduct>;
type EntityArrayResponseType = HttpResponse<IProductArray>;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly resourceUrl: string = '/products';

  constructor(private http: HttpClient) {
    this.resourceUrl = 'http://localhost:3000' + this.resourceUrl;
  }

  create(product: EntityResponseType): Observable<EntityResponseType> {
    return this.http
      .post<IProduct>(this.resourceUrl, product, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => res));
  }

  findAll<T>(): Observable<IProductArray> {
    return this.http
      .get<IProductArray>(this.resourceUrl, httpOptions);
  }

}
