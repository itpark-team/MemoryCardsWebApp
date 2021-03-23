import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {createUrlResolverWithoutPackagePrefix} from "@angular/compiler";
import {Action} from "rxjs/internal/scheduler/Action";


interface Deck {
  id: number;
  title: string;
  description: string;
  visibility: boolean;
  authorUserId: number;
  authorUser: string;
}

interface DeckToPost {
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

// interface Displayed


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
  deck: Deck = {id: 0, visibility: false, description: '', title: '', authorUserId: 1, authorUser: ''};
  deckToAction: DeckToPost = {id: 0, visibility: false, description: '', title: '', authorUserId: 1};
  user: User = {
    id: 0,
    subExpire: new Date(),
    isActive: false,
    email: '',
    avatarImage: '',
    username: '',
    passwordHash: '',
    subStatus: 0
  };
  currentUserId = 1;
  isEditing: boolean = false;

  constructor(private http: HttpClient, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getDecks();
    this.getCards();
    this.getDecksCards();
    this.getUser(this.currentUserId);
  }

  test(): void {

    console.log(this.cards);
  }

  log(id: number) {
    console.log(id);
  }

  openDeck(deckId: number): void {
    location.href = 'deckcards?deckId=' + deckId;
  }

  showAddDialog(): void {
    this.clearDeck();
    const dialogRef = this.dialog.open(AddDeckDialog, {
      data: this.deckToAction
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != "") {
        this.deckToAction = result;
        this.postDeck();
      }
    });
  }


  showEditDialog(id: number) {
    this.clearDeck();
    const dialogRef = this.dialog.open(EditDeckDialog, {
      data: this.deckToAction
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result == true) {
          this.deleteDeck(id)
        } else if (result != "") {
          this.deckToAction = result;
          this.deckToAction.id = id;
          this.putDeck();
        }
      }
    );
  }

  changeEditable() : void {
    this.isEditing = !this.isEditing;
    console.log(this.isEditing);
  }

  someActionWitdhDeck(id: number): void {
    if (this.isEditing) {
      this.showEditDialog(id);
    } else {
      this.openDeck(id);
    }
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
    this.deck = {id: 0, visibility: false, description: '', title: '', authorUserId: 1, authorUser: ''};
    this.deckToAction = {id: 0, visibility: false, description: '', title: '', authorUserId: 1};
  }


  getCards(): void {
    this.http.get<Card[]>(`/api/cards`).subscribe(
      responseData => {
        this.cards = responseData
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }

  getDecksCards(): void {
    this.http.get<DecksCard[]>(`/api/deckscards`).subscribe(
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
    this.http.get<Deck[]>(`/api/decks`).subscribe(
      responseData => {
        this.decks = responseData
        console.dir(this.decks[0])
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }

  deleteDeck(id: number): void {
    this.http.delete<number>(`/api/decks/${id}`).subscribe(
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
    const body = JSON.stringify(this.deckToAction);

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.post<Deck>(`/api/decks`, body, {headers: headers}).subscribe(
      responseData => {
        this.decks.push(responseData);
        this.decks[this.decks.length - 1].authorUser = this.getAuthorUsername(this.user.id);
        this.clearDeck();
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }

  putDeck(): void {
    const body = JSON.stringify(this.deckToAction);

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.put<Deck>(`/api/decks/${this.deckToAction.id}`, body, {headers: headers}).subscribe(
      responseData => {

        const findIndex = this.decks.findIndex(item => item.id == responseData.id);
        this.decks.splice(findIndex, 1, responseData);
        this.decks[findIndex].authorUser = this.getAuthorUsername(this.user.id);
        console.log(this.deckToAction.id);
        this.clearDeck();
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }

//======DECKS FINISH======//

  getUser(id: number): void {
    this.http.get<User>(`/api/users/${id}`).subscribe(
      responseData => {
        this.user.id = responseData.id;
        this.user.username = responseData.username;
        this.user.avatarImage = responseData.avatarImage;
        this.user.subStatus = responseData.subStatus;
        this.user.isActive = responseData.isActive;
        this.user.subExpire = responseData.subExpire;
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }

  getAuthorUsername(id: number): string {
    this.getUser(id);
    return this.user.username;
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

@Component({
  selector: 'edit-deck-dialog',
  templateUrl: 'edit-deck-dialog.html',
})
export class EditDeckDialog {
  constructor(public dialogRef: MatDialogRef<EditDeckDialog>, @Inject(MAT_DIALOG_DATA) public deck: Deck) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
