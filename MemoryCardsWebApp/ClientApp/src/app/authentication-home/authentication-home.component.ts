import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {createUrlResolverWithoutPackagePrefix} from "@angular/compiler";
import {Action} from "rxjs/internal/scheduler/Action";
import {DataStorageService} from "../data-storage/data-storage.service";
import {Router} from "@angular/router";

interface UserAuthenticationData {
  email: string;
  passwordHash: string;
}

interface User{
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


  constructor(private http: HttpClient, public dialog: MatDialog, private dataStorage: DataStorageService, private router: Router) {
    //alert('AUTH: '+this.dataStorage.getData('access_token'));
  }

  userAuthenticationData: UserAuthenticationData = {email: '', passwordHash: ''};

  ngOnInit(): void {

  }

  authenticate(): void {
    const body = JSON.stringify(this.userAuthenticationData);

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.post(`/api/users/`, body, {headers: headers}).subscribe(
      responseData => {
        this.dataStorage.saveData('access_token', responseData['access_token']);
        this.router.navigateByUrl('/deck');
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }

}
