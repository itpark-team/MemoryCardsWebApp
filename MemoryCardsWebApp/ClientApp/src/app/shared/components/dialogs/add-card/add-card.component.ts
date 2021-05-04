import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Card} from "../../../interfaces/card.interface";

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.sass']
})
export class AddCardComponent {
  constructor(
    public dialogRef: MatDialogRef<AddCardComponent>,
    @Inject(MAT_DIALOG_DATA) private _card: Card
  ) {
  }

  get card(): Card {
    return this._card;
  }

  set card(newCard) {
    this._card = newCard;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
