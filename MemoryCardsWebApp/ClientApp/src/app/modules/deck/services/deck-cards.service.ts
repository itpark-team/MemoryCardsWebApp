import {Injectable} from '@angular/core';
import {Card} from "../../../shared/interfaces/card.interface";
import {Deck} from "../../../shared/interfaces/deck.interface";
import {Observable, Subscription} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {CookieService} from "ngx-cookie-service";
import {environment} from "../../../../environments/environment";
import {DeckService} from "./deck.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DeckCardsService {

  private postfix = 'cards';

  private _cards: Card[] = [];

  get cards(): Card[] {
    return this._cards;
  }

  set cards(newCards) {
    this._cards = newCards;
  }

  private deckId: number;
  private subscription: Subscription;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private cookieService: CookieService,
    private router: Router,
    private _deckService: DeckService) {
  }

  loadCardsByDeckId(deckId: number): Observable<any> {
    // const token = this.cookieService.get('access_token');
    // const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.get(`${environment.apiUrl}/${this.postfix}/GetCardsByDeckId/${this.deckId}`)
      .pipe(
        map((response: any) => {
          this._cards = response;
        })
      );
  }


}
