import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Deck} from "../../../interfaces/deck.interface";

@Component({
  selector: 'app-edit-deck',
  templateUrl: './edit-deck.component.html',
  styleUrls: ['./edit-deck.component.sass']
})
export class EditDeckComponent {

  constructor(
    public dialogRef: MatDialogRef<EditDeckComponent>,
    @Inject(MAT_DIALOG_DATA) public deck: Deck
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
