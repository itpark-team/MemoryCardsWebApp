import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {createUrlResolverWithoutPackagePrefix} from "@angular/compiler";
import {Action} from "rxjs/internal/scheduler/Action";
import {DataStorageService} from "../data-storage/data-storage.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";


interface UserAuthenticationData {
  email: string;
  passwordHash: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  avatarImage: string;
  subStatus: number;
  subExpire: Date;
  isActive: boolean;
}

@Component({
  selector: 'app-authentication-home',
  templateUrl: './authentication-home.component.html',
  styleUrls: ['./authentication-home.component.css']
})
export class AuthenticationHomeComponent implements OnInit {

  delay24hours: number = 86400000;
  delay1000days: number = this.delay24hours * 1000;

  form: FormGroup;

  password: string;

  saveUser: boolean = false;

  private clearInputFields(): void {
    this.userAuthenticationData.email = "";
    this.userAuthenticationData.passwordHash = "";
  }

  private showWrongLoginOrPasswordDialog(): void {
    this.clearInputFields();
    const dialogRef = this.dialog.open(WrongLoginOrPasswordDialog);
  }


  constructor(private http: HttpClient, public dialog: MatDialog, private dataStorage: DataStorageService, private router: Router, private cookieService: CookieService) {
    if (this.cookieService.check('login') && this.cookieService.check('password')) {
      this.userAuthenticationData.email = this.cookieService.get('login');
      this.userAuthenticationData.passwordHash = this.cookieService.get('password');

      const body = JSON.stringify(this.userAuthenticationData);

      this.authenticateWithAuthData(body);
    }
  }

  userAuthenticationData: UserAuthenticationData = {email: '', passwordHash: ''};

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3)])
    })
  }

  onSubmit() {

  }


  /**
   * Authenticate user
   * @param body is json.stringified user's authentication data.
   */
  authenticateWithAuthData(body: string): void {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');


    this.http.post(`/api/users/login`, body, {headers: headers}).subscribe(
      responseData => {
        this.cookieService.set('access_token', responseData['access_token'], {expires: new Date(Date.now() + this.delay24hours)});
        this.cookieService.set('id_user', responseData['id_user'], {expires: new Date(Date.now() + this.delay24hours)});

        if (this.saveUser) {
          this.cookieService.set('login', this.userAuthenticationData.email, {expires: new Date(Date.now() + this.delay1000days)});
          this.cookieService.set('password', this.userAuthenticationData.passwordHash, {expires: new Date(Date.now() + this.delay1000days)});
        }

        this.router.navigateByUrl('/deck');
      },
      error => {
        if (error.status == 401)
          this.showWrongLoginOrPasswordDialog();
        else
          alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }

  async authenticateAsync(): Promise<void> {
    this.userAuthenticationData.passwordHash = this.password;
    const body = JSON.stringify(this.userAuthenticationData);

    this.authenticateWithAuthData(body);
  }

  authenticate(): void {
    this.userAuthenticationData.passwordHash = this.password;
    const body = JSON.stringify(this.userAuthenticationData);

    console.log(body)

    this.authenticateWithAuthData(body);
  }

  test123(): void {
    console.log(this.saveUser);
  }

}

@Component({
  selector: 'wrong-login-or-password-dialog',
  templateUrl: 'wrong-login-or-password-dialog.html',
})

export class WrongLoginOrPasswordDialog {
  constructor(public dialogRef: MatDialogRef<WrongLoginOrPasswordDialog>) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
