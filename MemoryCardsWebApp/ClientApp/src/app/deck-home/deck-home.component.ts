import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {find} from "rxjs/operators";

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

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  getDecks(): void {
    this.http.get<Deck[]>(`https://localhost:5001/api/decks`).subscribe(
      data => this.decks = data
    );
  }

  deleteDecks(id: number): void {
    this.http.delete<number>(`https://localhost:5001/api/decks/${id}`).subscribe(
      data => {
        const findIndex = this.decks.findIndex(item => item.id == id);
        this.decks.splice(findIndex, 1);
      }
    );
  }


}
