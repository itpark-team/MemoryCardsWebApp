import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';

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
  deck: Deck = {id: 0, visibility: false, description: '', title: '', authorUserId: 0};


  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getDecks();
    this.getCards();
    this.getDecksCards();
  }

  test(): void {

    console.log( this.cards);
  }

  cardExists(deckId: number, cardNumber: number): boolean {
    let count = this.getDeckCardsCount(deckId);
    return cardNumber <= count;
  }

  getDeckCardsCount(deckId: number): number {
    let count = 0;
    for (let i=0;i<this.decksCards.length ;i++)
    {
      if(this.decksCards[i].deckId==deckId)
      {
        count++;
      }
    }
    return count;
  }

  getCardText(deckId: number, cardNumber: number): string {
    let realId=this.decksCards.filter(c=>c.deckId==deckId)[cardNumber-1].cardId;
    console.log(realId);
    return this.cards.find(c=>c.id==realId).frontText;
  }

  private clearDeck(): void {
    this.deck = {id: 0, visibility: false, description: '', title: '', authorUserId: 0};
  }

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

    console.log(body);

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


}
