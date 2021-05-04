import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Deck} from "../../interfaces/deck.interface";

@Component({
    selector: 'add-deck-dialog',
    templateUrl: 'add-deck-dialog.html',
})
export class AddDeckDialog {
    constructor(public dialogRef: MatDialogRef<AddDeckDialog>, @Inject(MAT_DIALOG_DATA) public deck: Deck) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
