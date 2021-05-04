import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Card} from "../../interfaces/card.interface";

@Component({
  selector: 'app-training-home',
  templateUrl: './training-home.component.html',
  styleUrls: ['./training-home.component.css']
})
export class TrainingHomeComponent implements OnInit {

  hasTurned = false;

  get btnText(): string {
    return this.hasTurned ? 'Отправить в середину' : 'Отправить в конец';
  }


  @Input() cards: Card[];
  @Output() closeEvent = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  get cardText(): string {
    return this.hasTurned ? this.cards[0].backText : this.cards[0].frontText;
  }

  hide(): void {
    this.closeEvent.emit();
  }

  sendToMiddle(): void {

  }

  sendToBack(): void {

  }

  turnCard() {
    this.hasTurned = !this.hasTurned;
  }
}
