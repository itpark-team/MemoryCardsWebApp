import {Component, Inject, OnInit, } from '@angular/core';
import {Router} from "@angular/router";
import {waitForAsync} from "@angular/core/testing";
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-project-home',
  templateUrl: './project-home.component.html',
  styleUrls: ['./project-home.component.css']
})
export class ProjectHomeComponent implements OnInit {


  constructor(private router: Router, private elementRef:ElementRef) {
  }


  ngOnInit(): void {


    this.fuckingUpdate();
  }

  // ngAfterViewInit() {
  //   var s = document.createElement("script");
  //   s.type = "text/javascript";
  //   s.src = "https://code.jquery.com/jquery-3.5.1.min.js";
  //   this.elementRef.nativeElement.appendChild(s);
  //   var s2 = document.createElement("script");
  //   s2.type = "text/javascript";
  //   s2.src = "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js";
  //   this.elementRef.nativeElement.appendChild(s2);
  // }

  async fuckingUpdate() {
    while (true)
    {
      await this.delay(100);
    }

  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }


  get GetScrollHeight() {
    return document.getElementById("screen1").getBoundingClientRect().top;
  }

  goToAuth() {
    this.router.navigateByUrl("/auth");
  }

}
