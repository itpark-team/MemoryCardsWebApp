import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {DeckHomeComponent} from './deck-home/deck-home.component';
import {AddDeckDialog} from "./deck-home/deck-home.component";
import {EditDeckDialog} from "./deck-home/deck-home.component";
import {AddCardDialog, EditImageDialog} from "./deck-cards-home/deck-cards-home.component";
import {DeleteDialog} from "./deck-cards-home/deck-cards-home.component";
import {EditCardDialog} from "./deck-cards-home/deck-cards-home.component";
import {ProjectHomeComponent} from './project-home/project-home.component';
import {DeckCardsHomeComponent} from './deck-cards-home/deck-cards-home.component';
import {AuthenticationHomeComponent} from './authentication-home/authentication-home.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from "@angular/material/dialog";
import {DataStorageService} from "./data-storage/data-storage.service";
import {AuthCheckService} from "./auth-check/auth-check.service";

import {WrongLoginOrPasswordDialog} from "./authentication-home/authentication-home.component";
import {NotFoundComponent} from "./not-found/not-found.component";

const appRoutes: Routes = [
  {path: '', component: ProjectHomeComponent},
  {path: 'decks', component: DeckHomeComponent, canActivate: [AuthCheckService]},
  {path: 'deckcards/:id', component: DeckCardsHomeComponent, canActivate: [AuthCheckService]},
  {path: 'auth', component: AuthenticationHomeComponent},
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DeckHomeComponent,
    ProjectHomeComponent,
    NotFoundComponent,
    AddDeckDialog,
    EditDeckDialog,
    AddCardDialog,
    DeleteDialog,
    EditCardDialog,
    EditImageDialog,
    DeckCardsHomeComponent,
    AuthenticationHomeComponent,
    WrongLoginOrPasswordDialog
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  providers: [DataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
