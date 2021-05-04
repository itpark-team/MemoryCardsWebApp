import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {PasserService} from "../../services/pass-params/passer.service";
import {Deck} from "../../interfaces/deck.interface";
import {User} from "../../interfaces/user.interface";

@Component({
  selector: 'app-deck-home',
  templateUrl: './deck-home.component.html',
  styleUrls: ['./deck-home.component.css']
})
export class DeckHomeComponent implements OnInit {
  private readonly isUserAuthenticated: boolean;
  decks: Deck[] = [];

  constructor(private http: HttpClient,
              public dialog: MatDialog,
              private router: Router,
              private cookieService: CookieService) {
    this.isUserAuthenticated = this.cookieService.check("access_token");
  }


  ngOnInit(): void {
    if (this.isUserAuthenticated == false) {
      location.href = '';
    }
    this.getDecksByUserToken();
  }


  logout(): void {
    this.cookieService.delete('access_token');
    this.cookieService.delete('login');
    this.cookieService.delete('password');

    this.router.navigateByUrl("/auth");
  }

  openDeck(deckId: number): void {
    this.router.navigateByUrl('deckcards/' + deckId);
  }

  showCreatingDeckDialog(): void {
    let deck: Deck = {id: 0, visibility: false, description: '', title: '', authorUserId: 1, authorUser: ''};
    const dialogRef = this.dialog.open(AddDeckDialog, {
      data: deck
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != "") {
        deck = result;
        this.addDeck(deck);
      }
    });
  }


  async getDecksByUserToken(): Promise<void> {

    const token = this.cookieService.get('access_token');

    const headers = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer ' + token);


    this.http.get<Deck[]>(`/api/decks/GetDecksByUserToken`, {headers: headers}).subscribe(
      responseData => {
        this.decks = responseData;
        console.log(responseData);
      },
      error => {
        alert(`error get by token: ${error.status}, ${error.statusText}`);
      }
    );
  }

  addDeck(deck: Deck): void {
    const body = JSON.stringify(deck);

    const token = this.cookieService.get('access_token');

    //Order is important! 1st: Content-Type, then Authorization
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Authorization', 'Bearer ' + token);

    this.http.post<Deck>(`/api/decks`, body, {headers: headers}).subscribe(
      async responseData => {
        console.log(responseData);
        this.decks.push(responseData);
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
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
