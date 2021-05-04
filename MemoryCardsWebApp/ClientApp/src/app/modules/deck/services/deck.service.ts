import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {Deck} from "../../../shared/interfaces/deck.interface";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  private postfix = 'decks';

  private _deck: Deck;

  get deck(): Deck {
    return this._deck;
  }

  set deck(newDeck) {
    this._deck = newDeck;
  }


  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private cookieService: CookieService,
    private router: Router) {

    this._deck = {
      id: -1,
      title: '',
      description: '',
      authorUser: '',
      authorUserId: -1,
      visibility: true
    };
  }

  loadDeckById(deckId: number): Observable<any> {
    // const token = this.cookieService.get('access_token');
    // const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.get(`${environment.apiUrl}/${this.postfix}/${deckId}`, {withCredentials: true})
      .pipe(
        map((response: any) => {
          this._deck = response;
        })
      );
  }

  isValid(deckId: number) {
    //TODO Finish deck validation by deck's id
    return !!deckId;
  }

}
