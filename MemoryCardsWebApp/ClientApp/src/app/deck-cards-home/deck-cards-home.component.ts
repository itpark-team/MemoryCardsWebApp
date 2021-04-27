import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DataStorageService} from "../data-storage/data-storage.service";
import {CookieService} from "ngx-cookie-service";
import {PasserService} from "../pass-params/passer.service";
import {Card} from "../../interfaces/card.interface";
import {Deck} from "../../interfaces/deck.interface";
import {DeckCard} from "../../interfaces/deck-card.interface";


@Component({
  selector: 'app-deck-cards-home',
  templateUrl: './deck-cards-home.component.html',
  styleUrls: ['./deck-cards-home.component.css']
})
export class DeckCardsHomeComponent implements OnInit {
  cards: Card[] = [];
  private deckId: number;
  private decksCards: DeckCard[] = [];
  private card: Card;
  private decksCard: DeckCard;
  private querySubscription: Subscription;

  currentCards: Card[] = [];
  currentDeck: Deck;
  private subscription: Subscription;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private dataStorage: DataStorageService,
    private cookieService: CookieService,
    private router: Router,
    private passer: PasserService) {

    // Retrieve opened deck's id from DI
    this.subscription = route.params.subscribe(params => this.deckId = params['id']);

    this.currentDeck = {id: -1, title: "", description: "", authorUserId: -1, authorUserName: "", visibility: true};
  }

  ngOnInit(): void {

    this.getCurrentDeck();

    this.getCardsByDeckId();
  }


  //===================____DIALOGS____===================//

  private clearCard(): void {
    this.card = {id: 0, backText: "", frontText: "", backImage: "", color: "", frontImage: ""};
  }

  showAddDialog(): void {
    this.clearCard();
    const dialogRef = this.dialog.open(AddCardDialog, {data: this.card});

    dialogRef.afterClosed().subscribe(result => {
      if (result != "" && result != null) {
        this.card = result;
        this.postCard();
      }
    });
  }

  showEditCardDialog(editedCard: Card): void {
    this.clearCard();
    this.card.id = editedCard.id;
    this.card.color = editedCard.color;
    this.card.frontImage = editedCard.frontImage;
    this.card.backImage = editedCard.backImage;
    this.card.frontText = editedCard.frontText;
    this.card.backText = editedCard.backText;
    const dialogRef = this.dialog.open(EditCardDialog, {data: this.card});
    dialogRef.afterClosed().subscribe(result => {
      if (result != "" && result != null) {
        if (result == "Delete") {
          this.showDeleteCardDialog(this.card.id);
        } else {
          this.card = result;
          editedCard.id = this.card.id;
          editedCard.color = this.card.color;
          editedCard.frontImage = this.card.frontImage;
          editedCard.backImage = this.card.backImage;
          editedCard.frontText = this.card.frontText;
          editedCard.backText = this.card.backText;
          this.putCard()
        }
      }
    });
  }

  showDeleteCardDialog(cardId: number): void {
    const dialogRef = this.dialog.open(DeleteDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.deleteCard(cardId);
      }
    });
  }

  showDeleteDeckDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.deleteDeck();
      }
    });
  }


  //================____CARDS____CRUD____================//

  private getCardsByDeckId(): void {
    const token = this.cookieService.get('access_token');

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    this.http.get<Card[]>(`/api/cards/GetCardsByDeckId/${this.deckId}`, {headers: headers}).subscribe(
      responseData => {
        this.cards = responseData;
      },
      error => {
        this.passer.setErrorTypeId(error.status);

        this.router.navigateByUrl("/decks");
      }
    );
  }

  postCard(): void {

    const cardToSend = {"Card": this.card, "DeckId": this.deckId}
// ну нихуя себе что я нашёл
    const body = JSON.stringify(cardToSend);

    const token = this.cookieService.get('access_token');

    const headers = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + token);

    this.http.post<Card>(`/api/cards`, body, {headers: headers}).subscribe(
      responseData => {
        this.cards.push(responseData);
        this.currentCards.push(responseData);
        this.postDeckCard(responseData.id);
        this.clearCard();
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }

  putCard(): void {

    const cardToSend = {"Card": this.card, "DeckId": this.deckId}

    const body = JSON.stringify(cardToSend);

    const token = this.cookieService.get('access_token');

    const headers = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + token);

    this.http.put<Card>(`/api/cards/${this.card.id}`, body, {headers: headers}).subscribe(
      responseData => {

        const findIndex = this.cards.findIndex(item => item.id == responseData.id);
        this.cards.splice(findIndex, 1, responseData);

        this.clearCard();
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }

  deleteDeck(): void {
    const token = this.cookieService.get('access_token');

    const headers = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + token);

    this.http.delete<number>(`/api/decks/${this.currentDeck.id}`, {headers: headers}).subscribe(
      responseData => {
        location.href = 'decks';
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }

  deleteCard(cardId: number): void {
    const token = this.cookieService.get('access_token');

    const headers = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + token);

    this.http.get<void>(`/api/cards/GetAllowance/` + this.deckId, {headers: headers}).subscribe(
      () => {
        this.http.delete<number>(`/api/cards/` + this.card.id, {headers: headers}).subscribe(
          responseData => {
            const findIndex = this.cards.findIndex(item => item.id == responseData);
            this.cards.splice(findIndex, 1);
            const findIndex2 = this.currentCards.findIndex(item => item.id == responseData);
            this.currentCards.splice(findIndex2, 1);
          },
          error => {
            alert(`error: ${error.status}, ${error.statusText}`);
          }
        );
      }
    );
  }

  postDeckCard(cardId: number): void {
    this.decksCard = {cardId: cardId, deckId: this.currentDeck.id};

    const body = JSON.stringify(this.decksCard);
    const token = this.cookieService.get('access_token');

    const headers = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + token);

    this.http.post<DeckCard>(`/api/deckscards`, body, {headers: headers}).subscribe(
      responseData => {
        this.decksCards.push(responseData);
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }

  getCurrentDeck(): void {
    const token = this.cookieService.get('access_token');

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    this.http.get<Deck>(`/api/decks/${this.deckId}`, {headers: headers}).subscribe(
      responseData => {
        this.currentDeck = responseData;
      },
      error => {
        this.passer.setErrorTypeId(error.status)

        this.router.navigateByUrl("/decks");
      }
    );
  }

  goBack(): void {
    this.router.navigateByUrl("decks");
  }

  setCards(): void {
    if (this.decksCards.length != 0 && this.cards.length != 0) {
      for (let i = 0; i < this.decksCards.length; i++) {
        if (this.decksCards[i].deckId == this.deckId) {
          this.currentCards.push(this.cards.find(c => c.id == this.decksCards[i].cardId));
        }
      }
    }
  }
}

@Component({
  selector: 'add-card-dialog',
  templateUrl: 'add-card-dialog.html',
})
export class AddCardDialog {
  constructor(public dialogRef: MatDialogRef<AddCardDialog>,
              @Inject(MAT_DIALOG_DATA) public card: Card) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'edit-card-dialog',
  templateUrl: 'edit-card-dialog.html',
})
export class EditCardDialog {
  constructor(public dialogRef: MatDialogRef<EditCardDialog>,
              @Inject(MAT_DIALOG_DATA) public editedCard: Card,
              public dialog: MatDialog) {
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

@Component({
  selector: 'edit-image-dialog',
  templateUrl: 'edit-image-dialog.html',
})
export class EditImageDialog {
  constructor(public dialogRef: MatDialogRef<EditImageDialog>,
              @Inject(MAT_DIALOG_DATA) public editedImage: string) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

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



