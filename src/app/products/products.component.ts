import {Component, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';
import {IProduct} from '../model/product.model';
import {catchError, switchMap, toArray} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$: Observable<IProduct[]>;

  error: any;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.products$ = this.productService.findAll()
      .pipe(
        switchMap(res => {
          return res.products;
        }),
        toArray(),
        catchError(err => {
          if (err.status === 500) {
            this.error = err.error.error.name + ' ' + err.error.error.message;
          }
          return of([]);
        })
      );
  }

}
