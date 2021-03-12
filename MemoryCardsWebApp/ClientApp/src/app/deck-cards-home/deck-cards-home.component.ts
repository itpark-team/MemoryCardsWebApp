import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from 'rxjs';

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


  private querySubscription: Subscription;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
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
  }

  getCards(): void {
    this.http.get<Card[]>(`https://localhost:5001/api/cards`).subscribe(
      responseData => {
        this.cards = responseData;
        this.setCards();
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }

  getCurrentDeck(): void {
    this.http.get<Deck>(`https://localhost:5001/api/decks/${this.deckId}`).subscribe(
      responseData => {
        this.currentDeck = responseData;
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }

  getDecksCards(): void {
    this.http.get<DecksCard[]>(`https://localhost:5001/api/deckscards`).subscribe(
      responseData => {
        this.decksCards = responseData;
        this.setCards();
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }

  changFrontAndBack(card: Card) {
    let temp = card.frontText;
    card.frontText = card.backText;
    card.backText = temp;
  }

  goBack(): void {
    location.href='deck';
  }


  setCards(): void {
    console.log("set");
    console.log(this.decksCards.length);
    console.log(this.cards.length)

    if (this.decksCards.length != 0 && this.cards.length != 0) {
      for (let i = 0; i < this.decksCards.length; i++) {
        console.log("for");
        if (this.decksCards[i].deckId == this.deckId) {
          console.log("found");
          console.log(this.cards.find(c => c.id == this.decksCards[i].cardId));

          this.currentCards.push(this.cards.find(c => c.id == this.decksCards[i].cardId));

          console.log(this.currentCards[i]);
        }
      }
    }
  }


}
