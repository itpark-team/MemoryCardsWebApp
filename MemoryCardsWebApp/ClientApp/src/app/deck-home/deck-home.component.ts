import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DataStorageService} from "../data-storage/data-storage.service";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {PasserService} from "../pass-params/passer.service";
import {Deck} from "../../interfaces/deck.interface";
import {DeckToPost} from "../../interfaces/deck-to-post.interface";
import {User} from "../../interfaces/user.interface";

@Component({
  selector: 'app-deck-home',
  templateUrl: './deck-home.component.html',
  styleUrls: ['./deck-home.component.css']
})
export class DeckHomeComponent implements OnInit {

  private readonly isUserAuthenticated: boolean;

  decks: DeckWithAuthor[] = [];


  private deck: Deck;
  private user: User;
  private readonly currentUserId: number;


  constructor(private http: HttpClient,
              public dialog: MatDialog,
              private dataStorage: DataStorageService,
              private router: Router,
              private cookieService: CookieService,
              private passerService: PasserService) {

    this.isUserAuthenticated = this.cookieService.check("access_token");

    this.user = {
      id: 0,
      subExpire: new Date(),
      isActive: false,
      email: '',
      avatarImage: '',
      username: '',
      passwordHash: '',
      subStatus: 0
    };

    this.deck = {id: 0, visibility: false, description: '', title: '', authorUserId: 1, authorUserName: ''};

    this.deckToAction = {id: 0, visibility: false, description: '', title: '', authorUserId: 1};

    this.currentUserId = 0;
  }

  private async processError(): Promise<void> {
    if (this.passerService.getErrorTypeId() !== -1) {
      console.log(this.passerService.getErrorTypeId());
      // alert(this.passerService.getErrorTypeId());
    }
  }

  ngOnInit(): void {
    if (this.isUserAuthenticated == false) {
      location.href = '';
    }

    this.processError();

    this.getDecksByUserId();

    this.getUserByUserId(this.currentUserId);
  }


  //Methods from HTML
  logout(): void {
    this.cookieService.delete('id_user');
    this.cookieService.delete('access_token');
    this.cookieService.delete('login');
    this.cookieService.delete('password');

    this.router.navigateByUrl("/auth");
  }

  openDeck(deckId: number): void {
    this.router.navigateByUrl('deckcards/' + deckId);
  }

  showCreatingDeckDialog(): void {
    this.clearDeck();
    const dialogRef = this.dialog.open(AddDeckDialog, {
      data: this.deck
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != "") {
        this.deck = result;
        this.addDeck();
      }
    });
  }

  //Local methods
  private clearDeck(): void {

    this.deck = {id: 0, visibility: false, description: '', title: '', authorUserId: 1, authorUserName: ''};
    this.deckToAction = {id: 0, visibility: false, description: '', title: '', authorUserId: 1};
  }


  //======DECKS START======//

  async getDecksByUserId(): Promise<void> {

    const token = this.cookieService.get('access_token');

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    this.http.get<DeckWithAuthor[]>(`/api/decks/GetDecksByUserId`, {headers: headers}).subscribe(
      responseData => {
        this.decks = responseData
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }

  addDeck(): void {
    //this.deck.authorUserId = this.currentUserId;
    const body = JSON.stringify(this.deck);

    const token = this.cookieService.get('access_token');

    //Order is important! 1st: Content-Type, then Authorization
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Authorization', 'Bearer ' + token);

    this.http.post<DeckWithAuthor>(`/api/decks`, body, {headers: headers}).subscribe(
      async responseData => {
        this.decks.push(responseData);

        await this.getUsernameByUserId(this.user.id).then((userName) => {
          this.decks[this.decks.length - 1].authorUserName = userName

        })
        this.clearDeck();
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }

//======DECKS FINISH======//

  async getUserByUserId(id: number): Promise<void> {
    const token = this.cookieService.get('access_token');

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    this.http.get<User>(`/api/users`, {headers: headers}).subscribe(
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

  async getUsernameByUserId(id: number): Promise<string> {
    await this.getUserByUserId(id);
    return this.user.username;
  }
}


@Component({
  selector: 'add-deck-dialog',
  templateUrl: 'add-deck-dialog.html',
})
export class AddDeckDialog {
  constructor(public dialogRef: MatDialogRef<AddDeckDialog>, @Inject(MAT_DIALOG_DATA) public deck: DeckWithAuthor) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
