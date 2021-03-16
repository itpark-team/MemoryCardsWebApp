import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";


interface Deck {
  id: number;
  title: string;
  description: string;
  visibility: boolean;
  authorUserId: number;
}

interface Card {
  id: number;
  frontText: string;
  backText: string;
  frontImage: string;
  backImage: string;
  color: string;
}

interface User {
id: number;
username: string;
email: string;
passwordHash: string;
avatarImage: string;
subStatus: number;
subExpire: Date;
isActive: boolean;
}

interface DecksCard {
  deckId: number;
  cardId: Number;
}

@Component({
  selector: 'app-deck-home',
  templateUrl: './deck-home.component.html',
  styleUrls: ['./deck-home.component.css']
})
export class DeckHomeComponent implements OnInit {


  decks: Deck[] = [];
  cards: Card[] = [];
  decksCards: DecksCard[] = [];
  deck: Deck = {id: 0, visibility: false, description: '', title: '', authorUserId: 1};
  username: string = "";

  constructor(private http: HttpClient, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getDecks();
    this.getCards();
    this.getDecksCards();
  }

  test(): void {

    console.log(this.cards);
  }

  openDeck(deckId: number): void {
    location.href = 'deckcards?deckId=' + deckId;
  }

  showAddDialog(): void {
    this.clearDeck();
    const dialogRef = this.dialog.open(AddDeckDialog, {data: this.deck});

    dialogRef.afterClosed().subscribe(result => {
      if (result != "") {
        this.deck = result;
        this.postDeck();
      }
    });
  }

  cardExists(deckId: number, cardNumber: number): boolean {
    let count = this.getDeckCardsCount(deckId);
    return cardNumber <= count;
  }

  getDeckCardsCount(deckId: number): number {
    let count = 0;
    for (let i = 0; i < this.decksCards.length; i++) {
      if (this.decksCards[i].deckId == deckId) {
        count++;
      }
    }
    return count;
  }

  getCardText(deckId: number, cardNumber: number): string {
    let realId = this.decksCards.filter(c => c.deckId == deckId)[cardNumber - 1].cardId;
    return this.cards.find(c => c.id == realId).frontText;
  }

  private clearDeck(): void {
    this.deck = {id: 0, visibility: false, description: '', title: '', authorUserId: 1};
  }


  getCards(): void {
    this.http.get<Card[]>(`https://localhost:5001/api/cards`).subscribe(
      responseData => {
        this.cards = responseData
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }

  getDecksCards(): void {
    this.http.get<DecksCard[]>(`https://localhost:5001/api/deckscards`).subscribe(
      responseData => {
        this.decksCards = responseData
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }

  //======DECKS START======//

  getDecks(): void {
    this.http.get<Deck[]>(`https://localhost:5001/api/decks`).subscribe(
      responseData => {
        this.decks = responseData
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }

  deleteDeck(id: number): void {
    this.http.delete<number>(`https://localhost:5001/api/decks/${id}`).subscribe(
      responseData => {
        const findIndex = this.decks.findIndex(item => item.id == responseData);
        this.decks.splice(findIndex, 1);
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }

  postDeck(): void {

    const body = JSON.stringify(this.deck);

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.post<Deck>(`https://localhost:5001/api/decks`, body, {headers: headers}).subscribe(
      responseData => {
        this.decks.push(responseData);
        this.clearDeck();
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }

  putDeck(): void {
    const body = JSON.stringify(this.deck);


    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.put<Deck>(`https://localhost:5001/api/decks/${this.deck.id}`, body, {headers: headers}).subscribe(
      responseData => {

        const findIndex = this.decks.findIndex(item => item.id == responseData.id);
        this.decks.splice(findIndex, 1, responseData);

        this.clearDeck();
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }

  //======DECKS FINISH======//

  getUser(id: number): void {
    this.http.get<User>(`https://localhost:5001/api/users/${id}`).subscribe(
      responseData => {
        this.username = responseData.username;
      }
    );
  }

  getAuthorUsername(id: number): string {
    this.getUser(id);
    return this.username;
  }
}


@Component({
  selector: 'add-deck-dialog',
  templateUrl: 'add-deck-dialog.html',
})
export class AddDeckDialog {
  constructor(public dialogRef: MatDialogRef<AddDeckDialog>, @Inject(MAT_DIALOG_DATA) public deck: Deck) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
