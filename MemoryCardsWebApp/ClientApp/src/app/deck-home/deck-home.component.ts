import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DataStorageService} from "../data-storage/data-storage.service";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {PasserService} from "../pass-params/passer.service";


//Entities
interface Deck {
  id: number;
  title: string;
  description: string;
  visibility: boolean;
  authorUserId: number;
  authorUser: string;
}

interface DeckToPost {
  id: number;
  title: string;
  description: string;
  visibility: boolean;
  authorUserId: number;
}

interface User {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  avatarImage: string;
  subStatus: number;
  subExpire: Date;
  isActive: boolean;
}


@Component({
  selector: 'app-deck-home',
  templateUrl: './deck-home.component.html',
  styleUrls: ['./deck-home.component.css']
})
export class DeckHomeComponent implements OnInit {

  private readonly isAuth: boolean;

  decks: Deck[] = [];

  private deck: Deck;
  private deckToAction: DeckToPost;
  private user: User;
  private currentUserId: number;


  constructor(private http: HttpClient,
              public dialog: MatDialog,
              private dataStorage: DataStorageService,
              private router: Router,
              private cookieService: CookieService,
              private passerService: PasserService) {

    this.isAuth = this.cookieService.check("access_token");

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

    this.deck = {id: 0, visibility: false, description: '', title: '', authorUserId: 1, authorUser: ''};

    this.deckToAction = {id: 0, visibility: false, description: '', title: '', authorUserId: 1};

    this.currentUserId = 0;
  }

  ngOnInit(): void {
    if (this.isAuth == false) {
      location.href = '';
    }
    this.currentUserId = +this.cookieService.get('id_user');

    this.getDecksByUserId();

    this.getUser(this.currentUserId);
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

    //this.cookieService.set('opened_deck', deckId.toString());

    this.router.navigateByUrl('deckcards/'+deckId);
  }

  showAddDialog(): void {
    this.clearDeck();
    const dialogRef = this.dialog.open(AddDeckDialog, {
      data: this.deckToAction
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != "") {
        this.deckToAction = result;
        this.postDeck();
      }
    });
  }


  //Local methods
  private clearDeck(): void {
    this.deck = {id: 0, visibility: false, description: '', title: '', authorUserId: 1, authorUser: ''};
    this.deckToAction = {id: 0, visibility: false, description: '', title: '', authorUserId: 1};
  }


  //======DECKS START======//


  async getDecksByUserId(): Promise<void> {

    const token = this.cookieService.get('access_token');

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    this.http.get<Deck[]>(`/api/decks/GetDecksByUserId/${this.currentUserId}`, {headers: headers}).subscribe(
      responseData => {
        this.decks = responseData
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }

  deleteDeck(id: number): void {
    this.http.delete<number>(`/api/decks/${id}`).subscribe(
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
    this.deckToAction.authorUserId = this.currentUserId;
    const body = JSON.stringify(this.deckToAction);

    const token = this.cookieService.get('access_token');

    //Order is important! 1st: Content-Type, then Authorization
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .append('Authorization', 'Bearer ' + token);

    this.http.post<Deck>(`/api/decks`, body, {headers: headers}).subscribe(
      async responseData => {
        this.decks.push(responseData);
        await this.getAuthorUsername(this.user.id).then((userName) => {
          this.decks[this.decks.length - 1].authorUser = userName
        })
        this.clearDeck();
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );
  }

//======DECKS FINISH======//


  async getUser(id: number): Promise<void> {
    const token = this.cookieService.get('access_token');

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    this.http.get<User>(`/api/users/${id}`, {headers: headers}).subscribe(
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

  async getAuthorUsername(id: number): Promise<string> {
    await this.getUser(id);
    return this.user.username;
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

@Component({
  selector: 'edit-deck-dialog',
  templateUrl: 'edit-deck-dialog.html',
})
export class EditDeckDialog {
  constructor(public dialogRef: MatDialogRef<EditDeckDialog>, @Inject(MAT_DIALOG_DATA) public deck: Deck) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
