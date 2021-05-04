import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.sass']
})
export class DeleteConfirmComponent {

  constructor(public dialogRef: MatDialogRef<DeleteConfirmComponent>) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
