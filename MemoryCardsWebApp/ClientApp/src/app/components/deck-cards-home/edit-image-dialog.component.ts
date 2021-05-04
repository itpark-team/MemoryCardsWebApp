import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'edit-image-dialog',
    templateUrl: 'edit-image-dialog.html',
})
export class EditImageDialog {
    constructor(public dialogRef: MatDialogRef<EditImageDialog>, @Inject(MAT_DIALOG_DATA) public editedImage: string) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
