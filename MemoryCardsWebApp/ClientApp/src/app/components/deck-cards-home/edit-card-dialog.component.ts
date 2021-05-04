import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Card} from "../../interfaces/card.interface";
import {EditImageDialog} from "./edit-image-dialog.component";

@Component({
    selector: 'edit-card-dialog',
    templateUrl: 'edit-card-dialog.html',
})

export class EditCardDialog {
    constructor(public dialogRef: MatDialogRef<EditCardDialog>, @Inject(MAT_DIALOG_DATA) public editedCard: Card, public dialog: MatDialog) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    showEditBackImageDialog(editedCard: Card): void {
        const dialogRef = this.dialog.open(EditImageDialog, {data: editedCard.backImage});
        dialogRef.afterClosed().subscribe(result => {
            if (result != null && result != "") {
                editedCard.backImage = result;
            }
        });
    }

    showEditFrontImageDialog(editedCard: Card): void {
        const dialogRef = this.dialog.open(EditImageDialog, {data: editedCard.frontImage});
        dialogRef.afterClosed().subscribe(result => {
            if (result != null && result != "") {
                editedCard.frontImage = result;
            }
        });
    }

    public cancel(): void {
        this.dialog.closeAll();
    }
}
