import {Injectable} from '@angular/core';
import {CanActivate} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {LoginDto} from "../interfaces/loginDto";
import {sha512} from "js-sha512";
import {log} from "util";
import {IToken} from "../interfaces/IToken";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private postfix = 'user';

  private delay24hours: number = 86400000;
  private delay1000days: number = this.delay24hours * 1000;

  constructor(
    private _cookies: CookieService,
    private _httpClient: HttpClient,
    private router: Router
  ) {
  }

  private _token: IToken = {
    data: '',
    delay: 0
  }

  get token(): IToken {
    if (!this._token) {
      this._token.data = this._cookies.get('access_token');
    }

    return this._token;
  }

  set token(newToken: IToken) {
    this._token = newToken;

    this._cookies.set(
      'access_token',
      newToken.data,
      {expires: new Date(Date.now() + newToken.delay)});
  }

  killToken(): void {
    this.token = {data: '', delay: 0};

    if (this._cookies.check('access_token')) {
      this._cookies.delete('access_token');
    }
  }

  login(loginData: LoginDto): Observable<any> {

    loginData.passwordHash = sha512(loginData.passwordHash);

    return this._httpClient.post(`${environment.apiUrl}/${this.postfix}/login`, loginData, {withCredentials: true})
      .pipe(
        map((response: any) => {
          if (response?.authToken) {
            let tokenDelay = loginData.rememberMe ? this.delay1000days : this.delay24hours;

            this.token = {data: response.authToken, delay: tokenDelay};
          }
        })
      );
  }

  /*
  * Kills token and navigates to Authenticate page.
  */
  logout(): void {
    this.killToken();
    this.router.navigate(['/auth']);
  }

  isLoggedIn(): boolean {
    return !!this.token || !!this._cookies.get('access_token');
  }
}
