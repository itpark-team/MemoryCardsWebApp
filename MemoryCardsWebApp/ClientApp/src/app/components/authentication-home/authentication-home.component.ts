import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {UserAuthenticationData} from "../../interfaces/user-authentication-data.interface";
import {WrongLoginOrPasswordDialog} from "./wrong-login-or-password-dialog.component";
import {sha512} from "js-sha512"

@Component({
  selector: 'app-authentication-home',
  templateUrl: './authentication-home.component.html',
  styleUrls: ['./authentication-home.component.css']
})
export class AuthenticationHomeComponent implements OnInit {

  private delay24hours: number = 86400000;
  private delay1000days: number = this.delay24hours * 1000;

  inputPassword: string;
  inputEmail: string;
  saveUser: boolean = false;


  form: FormGroup;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private router: Router,
    private cookieService: CookieService) {

    if (this.cookieService.check('access_token')) {
      this.router.navigateByUrl('/decks');
    }

    if (this.cookieService.check('login') && this.cookieService.check('password')) {
      let authData: UserAuthenticationData = {
        email: this.cookieService.get('login'),
        passwordHash: this.cookieService.get('password')
      };

      this.authenticateWithAuthData(authData);
    }
  }

  ngOnInit(): void {

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3)])
    })

  }


  authenticatePressed(): void {

    let authData: UserAuthenticationData = {
      email: this.inputEmail,
      passwordHash: sha512(this.inputPassword)
    };

    this.authenticateWithAuthData(authData);

  }

  authenticateWithAuthData(data: UserAuthenticationData): void {
    let body = JSON.stringify(data);

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.post(`/api/users/login`, body, {headers: headers}).subscribe(
      responseData => {
        this.cookieService.set('access_token', responseData['access_token'], {expires: new Date(Date.now() + this.delay24hours)});

        if (this.saveUser) {
          this.cookieService.set('login', data.email, {expires: new Date(Date.now() + this.delay1000days)});
          this.cookieService.set('password', data.passwordHash, {expires: new Date(Date.now() + this.delay1000days)});
        }

        this.router.navigateByUrl('/decks');
      },
      error => {
        if (error.status == 401)
          this.showWrongLoginOrPasswordDialog();
        else
          alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }

  private clearInputData(): void {
    this.inputEmail = "";
    this.inputPassword = "";
  }

  private showWrongLoginOrPasswordDialog(): void {
    this.clearInputData();
    const dialogRef = this.dialog.open(WrongLoginOrPasswordDialog);
  }

  //For future I guess...
  signUpStub(): void {
    console.log(this.saveUser);
  }
}

