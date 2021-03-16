import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AddDeckDialog} from "../deck-home/deck-home.component";

interface Card {
  id: number;
  frontText: string;
  backText: string;
  frontImage: string;
  backImage: string;
  color: string;
}

interface DecksCard {
  deckId: number;
  cardId: number;
}

interface Deck {
  id: number;
  title: string;
  description: string;
  visibility: boolean;
  authorUserId: number;
}

@Component({
  selector: 'app-deck-cards-home',
  templateUrl: './deck-cards-home.component.html',
  styleUrls: ['./deck-cards-home.component.css']
})
export class DeckCardsHomeComponent implements OnInit {
  cards: Card[] = [];
  deckId: number;
  currentCards: Card[] = [];
  decksCards: DecksCard[] = [];
  currentDeck: Deck;
  card: Card;
  decksCard: DecksCard;
  cardSide: string;
  private querySubscription: Subscription;

  constructor(private http: HttpClient, private route: ActivatedRoute, public dialog: MatDialog) {
    this.querySubscription = route.queryParams.subscribe(
      (queryParam: any) => {
        this.deckId = queryParam['deckId'];
      }
    );
  }

  ngOnInit(): void {
    this.getCards();
    this.getDecksCards();
    this.getCurrentDeck();
    this.cardSide = "front";
  }

  showAddDialog(): void {
    this.clearCard();
    const dialogRef = this.dialog.open(AddCardDialog, {data: this.card});

    dialogRef.afterClosed().subscribe(result => {
      if (result != "") {
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
      if (result != "") {
        this.card = result;
        editedCard.id = this.card.id;
        editedCard.color = this.card.color;
        editedCard.frontImage = this.card.frontImage;
        editedCard.backImage = this.card.backImage;
        editedCard.frontText = this.card.frontText;
        editedCard.backText = this.card.backText;
        this.putCard()
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


  private clearCard(): void {
    this.card = {id: 0, backText: "", frontText: "", backImage: "", color: "", frontImage: ""};
  }

  getCards(): void {
    this.http.get<Card[]>(`/api/cards`).subscribe(
      responseData => {
        this.cards = responseData;
        this.setCards();
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }


  postCard(): void {
    let body = JSON.stringify(this.card);

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

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

    const body = JSON.stringify(this.card);
//     console.log(body);
// console.log(this.cards);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

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
    this.http.delete<number>(`/api/decks/${this.currentDeck.id}`).subscribe(
      responseData => {
        location.href = 'deck';
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }

  deleteCard(cardId: number): void {
    this.http.delete<number>(`/api/cards/${cardId}`).subscribe(
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

  postDeckCard(cardId: number): void {
    this.decksCard = {cardId: cardId, deckId: this.currentDeck.id};

    const body = JSON.stringify(this.decksCard);

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.post<DecksCard>(`/api/deckscards`, body, {headers: headers}).subscribe(
      responseData => {
        this.decksCards.push(responseData);
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }


  getCurrentDeck(): void {
    this.http.get<Deck>(`/api/decks/${this.deckId}`).subscribe(
      responseData => {
        this.currentDeck = responseData;
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }

  getDecksCards(): void {
    this.http.get<DecksCard[]>(`/api/deckscards`).subscribe(
      responseData => {
        this.decksCards = responseData;
        this.setCards();
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }

  changeCardSide() {
    if (this.cardSide == "front") {
      this.cardSide = "back";
    } else {
      this.cardSide = "front"
    }
  }

  goBack(): void {
    location.href = 'deck';
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
  constructor(public dialogRef: MatDialogRef<EditCardDialog>, @Inject(MAT_DIALOG_DATA) public editedCard: Card) {
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



