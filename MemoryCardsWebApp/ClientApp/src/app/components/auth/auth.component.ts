import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AccountService} from 'src/app/shared/services/account.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css', './auth.component.sass']
})
export class AuthComponent implements OnInit {
  authFormGroup: FormGroup = new FormGroup({});
  validators = [Validators.required];
  isFormSent = false;


  constructor(
    private router: Router,
    readonly matSnackBar: MatSnackBar,
    private accountService: AccountService,
    private cookieService: CookieService
  ) {
  }


  ngOnInit(): void {
    if (localStorage.getItem('token') === null) {
      localStorage.setItem('token', '');
    }

    if (this.cookieService.check('access_token')) {
      this.cookieService.delete('access_token');
    }

    this.authFormGroup = new FormGroup({
      login: new FormControl('', this.validators),
      password: new FormControl('', this.validators),
      rememberMe: new FormControl(''),
    });
  }


  auth(): void {
    if (this.authFormGroup.invalid) {
      return;
    }


    const values = {...this.authFormGroup.value};
    this.isFormSent = true;

    this.accountService.login(values)
      .subscribe(() => {
        this.isFormSent = false;

        this.router.navigate(['/surf']);

      }, error => {
        this.isFormSent = false;
        if (error.error?.error) {
          this.matSnackBar.open(error.error?.error, '', {duration: 3000});
        } else {
          this.matSnackBar.open('Ошибка на сервере', '', {duration: 3000});
          console.log('Error:', error);
        }
      });
  }
}
