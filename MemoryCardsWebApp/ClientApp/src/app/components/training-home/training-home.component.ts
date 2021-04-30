import { Component, OnInit, Input } from '@angular/core';
import {Card} from "../../interfaces/card.interface";

@Component({
  selector: 'app-training-home',
  templateUrl: './training-home.component.html',
  styleUrls: ['./training-home.component.css']
})
export class TrainingHomeComponent implements OnInit {

  @Input() cards: Card[];

  constructor() { }

  ngOnInit(): void {
  }

}
