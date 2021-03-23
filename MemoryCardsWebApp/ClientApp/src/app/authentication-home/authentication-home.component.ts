//import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {createUrlResolverWithoutPackagePrefix} from "@angular/compiler";
import {Action} from "rxjs/internal/scheduler/Action";

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

  user: User = {
    id: 0,
    subExpire: new Date(),
    isActive: false,
    email: '',
    avatarImage: '',
    username: '',
    passwordHash: '',
    subStatus: 0
  };

  login: string = "";
  passwordHash: string = "";

  constructor(private http: HttpClient, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  authenticate(login: string, password: string): void {
    let userData: string[] = [login, password]
    const body = JSON.stringify(userData);

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.post<User>(`/api/users/`, body, {headers: headers}).subscribe(
      responseData => {
        this.user = responseData;
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }

}
