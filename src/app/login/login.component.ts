import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../services/product.service';
import {UserService} from '../services/user.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {IProduct} from '../model/product.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private userService: UserService,
              private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      id: new FormControl(''),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  save() {
    const user = this.loginForm.value;
    this.userService
      .login(user)
      .subscribe(
        (res: HttpResponse<IProduct>) =>
          this.onProductSaveSuccess(res.body),
        (res: HttpErrorResponse) => this.onProductSaveError(res)
      );
  }

  /*opst saving operation.*/
  private onProductSaveSuccess(result: IProduct) {
    console.log(result);
  }

  private onProductSaveError(res: HttpErrorResponse) {
    console.log(res);
  }

}
