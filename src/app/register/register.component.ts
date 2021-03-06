import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {IProduct} from '../model/product.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent implements OnInit {

  loginForm: FormGroup;

  error: any;

  constructor(private userService: UserService,
              private fb: FormBuilder,
              private router: Router,
              private translateService: TranslateService
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
      .signUp(user)
      .subscribe(
        (res: HttpResponse<IProduct>) =>
          this.onProductSaveSuccess(res.body),
        (res: HttpErrorResponse) => this.onProductSaveError(res)
      );
  }

  /*opst saving operation.*/
  private onProductSaveSuccess(result: IProduct) {
    this.router.navigate(['/']);
    console.log(result);
  }

  private onProductSaveError(err: any) {
    if (err.status === 500) {
      this.error = err.error.error.name + ' ' + err.error.error.message;
    } else if (err.status === 409) {
      this.error = this.translateService.instant(err.error.message);
    }
  }
}
