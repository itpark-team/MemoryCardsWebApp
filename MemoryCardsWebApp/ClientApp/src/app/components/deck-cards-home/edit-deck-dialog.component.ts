import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Deck} from "../../interfaces/deck.interface";

@Component({
  selector: 'edit-deck-dialog',
  templateUrl: 'edit-deck-dialog.html',
})
export class EditDeckDialog {
  constructor(public dialogRef: MatDialogRef<EditDeckDialog>, @Inject(MAT_DIALOG_DATA) public deck: Deck) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
