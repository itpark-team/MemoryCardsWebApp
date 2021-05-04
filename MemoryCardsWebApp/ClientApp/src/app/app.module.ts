import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {DeckHomeComponent} from "./components/deck-home/deck-home.component";
import {ProjectHomeComponent} from "./components/project-home/project-home.component";
import {DeckCardsHomeComponent} from "./components/deck-cards-home/deck-cards-home.component";
import {AuthenticationHomeComponent} from "./components/authentication-home/authentication-home.component";

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from "@angular/material/dialog";
import {AuthCheckService} from "./services/auth-check/auth-check.service";

import {NotFoundComponent} from "./components/not-found/not-found.component";
import { TrainingHomeComponent } from './components/training-home/training-home.component';
import {WrongLoginOrPasswordDialog} from "./components/authentication-home/wrong-login-or-password-dialog.component";
import {EditCardDialog} from "./components/deck-cards-home/edit-card-dialog.component";
import {EditImageDialog} from "./components/deck-cards-home/edit-image-dialog.component";
import {DeleteDialog} from "./components/deck-cards-home/delete-dialog.component";
import {EditDeckDialog} from "./components/deck-cards-home/edit-deck-dialog.component";
import {AddCardDialog} from "./components/deck-cards-home/add-card-dialog.component";
import {AddDeckDialog} from "./components/deck-home/add-deck-dialog.component";

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
    AddCardDialog,
    DeleteDialog,
    EditCardDialog,
    EditDeckDialog,
    EditImageDialog,
    DeckCardsHomeComponent,
    AuthenticationHomeComponent,
    WrongLoginOrPasswordDialog,
    TrainingHomeComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
