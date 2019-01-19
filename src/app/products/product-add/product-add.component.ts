import {Component, OnInit} from '@angular/core';
import {IProduct} from '../../model/product.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../services/product.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productForm: FormGroup;

  constructor(private productService: ProductService,
              private fb: FormBuilder,
              private router: Router,
  ) {
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.productForm = this.fb.group({
      id: new FormControl(''),
      name: new FormControl('', Validators.required)
    });
  }

  save() {
    const product = this.productForm.value;
    this.productService
      .create(product)
      .subscribe(
        (res: HttpResponse<IProduct>) =>
          this.onProductSaveSuccess(res.body),
        (res: HttpErrorResponse) => this.onProductSaveError(res)
      );
  }

  /*opst saving operation.*/
  private onProductSaveSuccess(result: IProduct) {
    this.router.navigate(['/products']);
    console.log(result);
  }

  private onProductSaveError(res: HttpErrorResponse) {
    console.log(res);
  }

}
