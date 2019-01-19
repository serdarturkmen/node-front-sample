import {Component, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';
import {IProduct} from '../model/product.model';
import {switchMap, toArray} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$: Observable<IProduct[]>;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.products$ = this.productService.findAll()
      .pipe(
        switchMap(res => res),
        toArray()
      );
  }

}
