import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Card} from "../../interfaces/card.interface";

@Component({
    selector: 'add-card-dialog',
    templateUrl: 'add-card-dialog.html',
})
export class AddCardDialog {
    constructor(public dialogRef: MatDialogRef<AddCardDialog>, @Inject(MAT_DIALOG_DATA) public card: Card) {

    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
