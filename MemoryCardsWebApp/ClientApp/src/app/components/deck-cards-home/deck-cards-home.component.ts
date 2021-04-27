import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CookieService} from "ngx-cookie-service";
import {Card} from "../../interfaces/card.interface";
import {Deck} from "../../interfaces/deck.interface";
import {DecksCard} from "../../interfaces/decks-card.interface";
import {CardDTO} from "../../interfaces/card-dto";





@Component({
  selector: 'app-deck-cards-home',
  templateUrl: './deck-cards-home.component.html',
  styleUrls: ['./deck-cards-home.component.css']
})
export class DeckCardsHomeComponent implements OnInit {
  cards: Card[] = [];
  deck: Deck;

  private deckId: number;
  private subscription: Subscription;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private cookieService: CookieService,
    private router: Router) {


    this.subscription = route.params.subscribe(params => this.deckId = params['id']);
  }


  ngOnInit(): void {
    this.getCurrentDeck();

    this.getCardsByDeckId();
  }


  showAddDialog(): void {
    let card: Card = this.getClearCard();
    const dialogRef = this.dialog.open(AddCardDialog, {data: card});

    dialogRef.afterClosed().subscribe(result => {
      if (result != "" && result != null) {
        card = result;
        console.log(card);
        this.postCard(card);
      }
    });
  }

  showEditCardDialog(editedCard: Card): void {
    let card: Card = this.getClearCard();
    card.id = editedCard.id;
    card.color = editedCard.color;
    card.frontImage = editedCard.frontImage;
    card.backImage = editedCard.backImage;
    card.frontText = editedCard.frontText;
    card.backText = editedCard.backText;
    const dialogRef = this.dialog.open(EditCardDialog, {data: card});
    dialogRef.afterClosed().subscribe(result => {
      if (result != "" && result != null) {
        if (result == "Delete") {
          this.showDeleteCardDialog(card.id);
        } else {
          card = result;
          editedCard.id = card.id;
          editedCard.color = card.color;
          editedCard.frontImage = card.frontImage;
          editedCard.backImage = card.backImage;
          editedCard.frontText = card.frontText;
          editedCard.backText = card.backText;
          this.putCard(card)
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


  private getClearCard(): Card {
    let card: Card={id: 0, backText: "", frontText: "", backImage: "", color: "", frontImage: ""};
    return  card;
  }

  postCard(card: Card): void {
    let cardDTO:CardDTO={card:card,deckId:this.deckId};
    const body = JSON.stringify(cardDTO);

    const token = this.cookieService.get('access_token');
    console.log(token)

    const headers = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + token);


    this.http.post<Card>(`/api/cards`, body, {headers: headers}).subscribe(
      responseData => {
        this.cards.push(responseData);
        this.postDeckCard(responseData.id);
      },
      error => {
        alert(`error post: ${error.status},  ${error.statusText},`);
      }
    );
  }

  putCard(card: Card): void {
    let cardDTO:CardDTO={card:card,deckId:this.deckId};
    const body = JSON.stringify(cardDTO);
    const token = this.cookieService.get('access_token');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + token);

    this.http.put<Card>(`/api/cards/${card.id}`, body, {headers: headers}).subscribe(
      responseData => {
        const findIndex = this.cards.findIndex(item => item.id == responseData.id);
        this.cards.splice(findIndex, 1, responseData);
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }

  deleteDeck(): void {
    const token = this.cookieService.get('access_token');

    const headers = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + token);

    this.http.delete<number>(`/api/decks/${this.deckId}`, {headers: headers}).subscribe(
      responseData => {
        location.href = 'deck';
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }

  deleteCard(cardId: number): void {
    const token = this.cookieService.get('access_token');

    const headers = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + token);


    this.http.delete<number>(`/api/cards/${cardId}`, {headers: headers}).subscribe(
      responseData => {
        const findIndex = this.cards.findIndex(item => item.id == responseData);
        this.cards.splice(findIndex, 1);
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }

  postDeckCard(cardId: number): void {
    let decksCard: DecksCard = {cardId: cardId, deckId: this.deckId};

    const body = JSON.stringify(decksCard);
    const token = this.cookieService.get('access_token');

    const headers = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + token);

    this.http.post<DecksCard>(`/api/deckscards`, body, {headers: headers}).subscribe(
      responseData => {
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
        this.deck = responseData;
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }



  goBack(): void {
    this.router.navigateByUrl("decks");
  }



  private getCardsByDeckId(): void {
    const token = this.cookieService.get('access_token');

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    this.http.get<Card[]>(`/api/cards/GetCardsByDeckId/${this.deckId}`, {headers: headers}).subscribe(
      responseData => {
        this.cards = responseData;
        console.dir(this.cards)
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }
}

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



