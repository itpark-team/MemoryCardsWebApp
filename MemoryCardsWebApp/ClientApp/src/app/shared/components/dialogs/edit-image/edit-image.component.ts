import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.sass']
})
export class EditImageComponent {

  constructor(
    public dialogRef: MatDialogRef<EditImageComponent>,
    @Inject(MAT_DIALOG_DATA) public imageUrl: string) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
