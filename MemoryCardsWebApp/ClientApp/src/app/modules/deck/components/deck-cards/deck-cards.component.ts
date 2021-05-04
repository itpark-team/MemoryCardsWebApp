import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from 'rxjs';
import {MatDialog} from "@angular/material/dialog";
import {CookieService} from "ngx-cookie-service";
import {Card} from "../../../../shared/interfaces/card.interface";
import {Deck} from "../../../../shared/interfaces/deck.interface";
import {DecksCard} from "../../../../shared/interfaces/decks-card.interface";
import {CardDTO} from "../../../../shared/interfaces/cardDto";
import {DeckService} from "../../services/deck.service";
import {DeckCardsService} from "../../services/deck-cards.service";

@Component({
  selector: 'app-deck-cards-home',
  templateUrl: './deck-cards.component.html',
  styleUrls: ['./deck-cards.component.css']
})
export class DeckCardsComponent implements OnInit {
  isHidden = true;

  cards: Card[] = [];
  deck: Deck;

  private deckId: number;
  private subscription: Subscription;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private cookieService: CookieService,
    private router: Router,
    private _deckService: DeckService,
    private _deckCardsService: DeckCardsService) {


  }


  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => this.deckId = params['id']);
    if (!this._deckService.isValid(this.deckId)) {
      //TODO Handle invalid deck error
    }

    this.getCurrentDeck();

    this.getCardsByDeckId();
  }


  showAddDialog(): void {
    let card: Card = this.getClearCard();
    const dialogRef = this.dialog.open(AddCardDialog, {data: card});

    dialogRef.afterClosed().subscribe(result => {
      if (result != "" && result != null) {
        card = result;
        console.log(card);
        this.postCard(card);
      }
    });
  }

  //TODO finish transportation of dialogs

  showEditCardDialog(editedCard: Card): void {
    let card: Card = this.getClearCard();
    card.id = editedCard.id;
    card.color = editedCard.color;
    card.frontImage = editedCard.frontImage;
    card.backImage = editedCard.backImage;
    card.frontText = editedCard.frontText;
    card.backText = editedCard.backText;
    const dialogRef = this.dialog.open(EditCardDialog, {data: card});
    dialogRef.afterClosed().subscribe(result => {
      if (result != "" && result != null) {
        if (result == "Delete") {
          this.showDeleteCardDialog(card.id);
        } else {
          card = result;
          editedCard.id = card.id;
          editedCard.color = card.color;
          editedCard.frontImage = card.frontImage;
          editedCard.backImage = card.backImage;
          editedCard.frontText = card.frontText;
          editedCard.backText = card.backText;
          this.putCard(card)
        }
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

  showEditDeckDialog(): void {
    const dialogRef = this.dialog.open(EditDeckDialog, {
      data: this.deck
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != "") {
        this.deck = result;
        console.log(result.id);
        this.editDeck();
      }
    })
  }

  showDeleteDeckDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.deleteDeck();
      }
    });
  }


  private getClearCard(): Card {
    let card: Card = {id: 0, backText: "", frontText: "", backImage: "", color: "", frontImage: ""};
    return card;
  }

  postCard(card: Card): void {
    let cardDTO: CardDTO = {card: card, deckId: this.deckId};
    const body = JSON.stringify(cardDTO);

    const token = this.cookieService.get('access_token');
    console.log(token)

    const headers = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + token);


    this.http.post<Card>(`/api/cards`, body, {headers: headers}).subscribe(
      responseData => {
        this.cards.push(responseData);
        this.postDeckCard(responseData.id);
      },
      error => {
        alert(`error post: ${error.status},  ${error.statusText},`);
      }
    );
  }

  putCard(card: Card): void {
    let cardDTO: CardDTO = {card: card, deckId: this.deckId};
    const body = JSON.stringify(cardDTO);
    const token = this.cookieService.get('access_token');
    const headers = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + token);

    this.http.put<Card>(`/api/cards/${card.id}`, body, {headers: headers}).subscribe(
      responseData => {
        const findIndex = this.cards.findIndex(item => item.id == responseData.id);
        this.cards.splice(findIndex, 1, responseData);
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }

  editDeck(): void {
    const body = JSON.stringify(this.deck);

    const token = this.cookieService.get('access_token');

    const headers = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + token);

    this.http.put<Deck>(`/api/decks/${this.deck.id}`, body, {headers: headers}).subscribe(
      responseData => {
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }

  deleteDeck(): void {
    const token = this.cookieService.get('access_token');

    const headers = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + token);

    this.http.delete<number>(`/api/decks/${this.deckId}`, {headers: headers}).subscribe(
      responseData => {
        this.router.navigateByUrl("decks");
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }

  deleteCard(cardId: number): void {
    const token = this.cookieService.get('access_token');

    const headers = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + token);


    this.http.delete<number>(`/api/cards/${cardId}`, {headers: headers}).subscribe(
      responseData => {
        const findIndex = this.cards.findIndex(item => item.id == responseData);
        this.cards.splice(findIndex, 1);
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }

  postDeckCard(cardId: number): void {
    let decksCard: DecksCard = {cardId: cardId, deckId: this.deckId};

    const body = JSON.stringify(decksCard);
    const token = this.cookieService.get('access_token');

    const headers = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + token);

    this.http.post<DecksCard>(`/api/deckscards`, body, {headers: headers}).subscribe(
      responseData => {
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }

  goBack(): void {
    this.router.navigateByUrl("decks");
  }


  //TITLE Finished refactoring:

  private getCurrentDeck(): void {
    this._deckService.loadDeckById(this.deckId)
      .subscribe(() => {
        this.deck = this._deckService.deck;
      }, error => {
        //TODO Output nett error
        console.log(`ERROR in getCurrentDeck(): ${error}`)
      });
  }

  private getCardsByDeckId(): void {
    this._deckCardsService.loadCardsByDeckId(this.deckId)
      .subscribe(() => {
        this.cards = this._deckCardsService.cards;
        console.dir(this.cards);
      }, error => {
        //TODO Output nett error
        console.log(`ERROR in getCardsByDeckId: ${error}`);
      });
  }

  toggleTraining(): void {
    this.isHidden = !this.isHidden;
  }
}
