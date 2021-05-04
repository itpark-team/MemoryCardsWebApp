import {Component} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'delete-dialog',
    templateUrl: 'delete-dialog.html',
})
export class DeleteDialog {
    constructor(public dialogRef: MatDialogRef<DeleteDialog>) {

    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
