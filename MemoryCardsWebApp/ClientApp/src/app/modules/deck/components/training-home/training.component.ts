import { Component, OnInit, Input } from '@angular/core';
import {Card} from "../../interfaces/card.interface";

@Component({
  selector: 'app-training-home',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  @Input() cards: Card[];

  constructor() { }

  ngOnInit(): void {
  }

}
