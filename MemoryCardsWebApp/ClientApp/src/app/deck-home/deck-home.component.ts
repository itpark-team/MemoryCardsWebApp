import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';

interface Deck {
  id: number;
  title: string;
  description: string;
  visibility: boolean;
}

@Component({
  selector: 'app-deck-home',
  templateUrl: './deck-home.component.html',
  styleUrls: ['./deck-home.component.css']
})
export class DeckHomeComponent implements OnInit {

  decks: Deck[] = [];
  deck: Deck = {id: 0, visibility: false, description: '', title: ''};

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  private clearDeck(): void {
    this.deck = {id: 0, visibility: false, description: '', title: ''};
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
