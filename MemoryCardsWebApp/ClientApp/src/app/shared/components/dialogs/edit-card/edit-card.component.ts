import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Card} from "../../../interfaces/card.interface";
import {EditImageComponent} from "../edit-image/edit-image.component";
import {CardSide} from "../../../enums/card-side.enum";

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.sass']
})
export class EditCardComponent {

  CardFrontSide = CardSide.frontSide;
  CardBackSide = CardSide.backSide;

  constructor(
    public dialogRef: MatDialogRef<EditCardComponent>,
    @Inject(MAT_DIALOG_DATA) private _card: Card,
    private _dialogMat: MatDialog
    ) {
  }

  get card(): Card {
    return this._card;
  }

  set card(newCard) {
    this._card = newCard;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  editImage(imageUrl: string, side: CardSide): void {
    const editImageDialog = this._dialogMat.open(EditImageComponent, {data: imageUrl});

    editImageDialog.afterClosed().subscribe(edits => {
      if (!edits) {
        if (side == CardSide.frontSide) {
          this._card.frontImage = edits;
        } else {
          this._card.backImage = edits;
        }
      }
    })
  }

}
