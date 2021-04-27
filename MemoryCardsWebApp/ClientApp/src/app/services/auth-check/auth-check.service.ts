import {Injectable} from "@angular/core";
import {CanActivate} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Injectable({providedIn: 'root'})
export class AuthCheckService implements CanActivate{
  constructor( private cookieService: CookieService) {
  }

  canActivate(): boolean {
    //alert('CAN ACTIVATE: '+this.dataStorage.getData('access_token'));
   //return this.dataStorage.hasData('access_token');
    return this.cookieService.check('access_token');
    //return  true;
  }
}
