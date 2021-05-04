import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Deck} from "../../../interfaces/deck.interface";


@Component({
  selector: 'app-add-deck',
  templateUrl: './add-deck.component.html',
  styleUrls: ['./add-deck.component.sass']
})
export class AddDeckComponent {
  constructor(
    public dialogRef: MatDialogRef<AddDeckComponent>,
    @Inject(MAT_DIALOG_DATA) private _deck: Deck
  ) {
  }

  get deck(): Deck {
    return this._deck;
  }

  set deck(newDeck) {
    this._deck = newDeck;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
