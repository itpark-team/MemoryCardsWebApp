//import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {createUrlResolverWithoutPackagePrefix} from "@angular/compiler";
import {Action} from "rxjs/internal/scheduler/Action";

interface UserAuthenticationData {
  login: string;
  password: string;
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


  constructor(private http: HttpClient, public dialog: MatDialog) {
  }

  userAuthenticationData: UserAuthenticationData = {login: '', password: ''};

  ngOnInit(): void {

  }

  authenticate(): void {
    const body = JSON.stringify(this.userAuthenticationData);

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.post<User>(`/api/users/`, body, {headers: headers}).subscribe(
      responseData => {
        this.userAuthenticationData;
//хэшировать потом))))
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }

}
