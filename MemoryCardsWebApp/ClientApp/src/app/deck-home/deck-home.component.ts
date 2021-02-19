import {HttpClient} from '@angular/common/http';
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

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  loadDecks(): void {
    this.http.get<Deck[]>('https://localhost:5001/api/decks').subscribe(
      data => this.decks = data
    );
  }
}
