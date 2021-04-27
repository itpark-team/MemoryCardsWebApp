import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {CookieService} from "ngx-cookie-service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-error-pages',
  templateUrl: './error-pages.component.html',
  styleUrls: ['./error-pages.component.css']
})
export class ErrorPagesComponent implements OnInit {
  private error: string;
  private subscription: Subscription;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              public dialog: MatDialog) {
    this.subscription = route.params.subscribe(params => this.error = params['code']);
  }

  ngOnInit(): void {
  }

}
