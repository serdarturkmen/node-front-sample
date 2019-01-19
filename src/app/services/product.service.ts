import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IProduct} from '../model/product.model';
import {map} from 'rxjs/operators';

type EntityArrayResponseType = HttpResponse<IProduct[]>;
type EntityResponseType = HttpResponse<IProduct>;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
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

  create(product: IProduct): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(product);
    return this.http
      .post<IProduct>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(product: IProduct): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(product);
    return this.http
      .put<IProduct>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findAll<T>(): Observable<IProduct[]> {
    return this.http
      .get<IProduct[]>(this.resourceUrl, httpOptions);
  }

  private convertArrayResponse(
    res: EntityArrayResponseType
  ): EntityArrayResponseType {
    const jsonResponse: IProduct[] = res.body;
    const body: IProduct[] = [];
    for (let i = 0; i < jsonResponse.length; i++) {
      body.push(this.convertItemFromServer(jsonResponse[i]));
    }
    return res.clone({ body });
  }

  /**
   * Convert a returned JSON object to product.
   */
  private convertItemFromServer(product: IProduct): IProduct {
    const copy: IProduct = Object.assign({}, product);
    return copy;
  }

  private convertDateFromClient(product: IProduct): IProduct {
    const copy: IProduct = Object.assign({}, product, {});
    return copy;
  }

  private convertDateFromServer(res: EntityResponseType): EntityResponseType {
    return res;
  }
}
