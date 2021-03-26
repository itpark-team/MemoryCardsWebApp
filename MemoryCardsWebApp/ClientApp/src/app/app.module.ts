import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {DeckHomeComponent} from './deck-home/deck-home.component';
import {AddDeckDialog} from "./deck-home/deck-home.component";
import {EditDeckDialog} from "./deck-home/deck-home.component";
import {AddCardDialog} from "./deck-cards-home/deck-cards-home.component";
import {DeleteDialog} from "./deck-cards-home/deck-cards-home.component";
import {EditCardDialog} from "./deck-cards-home/deck-cards-home.component";
import {ProjectHomeComponent} from './project-home/project-home.component';
import {DeckCardsHomeComponent} from './deck-cards-home/deck-cards-home.component';
import { AuthenticationHomeComponent } from './authentication-home/authentication-home.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from "@angular/material/dialog";

const appRoutes: Routes = [
  {path: '', component: ProjectHomeComponent},
  {path: 'deck', component: DeckHomeComponent},
  {path: 'deckcards', component: DeckCardsHomeComponent},
  {path: 'auth', component: AuthenticationHomeComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    DeckHomeComponent,
    ProjectHomeComponent,
    AddDeckDialog,
    EditDeckDialog,
    AddCardDialog,
    DeleteDialog,
    EditCardDialog,
    DeckCardsHomeComponent,
    AuthenticationHomeComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
