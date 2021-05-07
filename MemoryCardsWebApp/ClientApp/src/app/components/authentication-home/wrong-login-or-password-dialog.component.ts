import {Component} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'wrong-login-or-password-dialog',
  templateUrl: 'wrong-login-or-password-dialog.html',
})

export class WrongLoginOrPasswordDialog {
  constructor(
    public dialogRef: MatDialogRef<WrongLoginOrPasswordDialog>) {

  }
//wqewq
  onNoClick(): void {
    this.dialogRef.close();
  }
}
