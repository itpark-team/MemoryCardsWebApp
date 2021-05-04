import {NgModule, Provider} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeckCardsComponent} from "./components/deck-cards/deck-cards.component";
import {DecksComponent} from "./components/decks/decks.component";
import {TrainingComponent} from "./components/training-home/training.component";
import {SharedModule} from "../../shared/modules/shared.module";
import {MaterialSharedModule} from "../../shared/modules/material-shared.module";
import {RouterModule} from "@angular/router";
import {DeckCardsService} from "./services/deck-cards.service";
import {DeckService} from "./services/deck.service";

//TODO Repair the whole deck component

@NgModule({
  declarations: [
    DeckCardsComponent,
    DecksComponent,
    TrainingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialSharedModule,
    RouterModule.forChild([
      {path: '', component: DecksComponent},
      {path: 'deck/:id', component: DeckCardsComponent},
      {path: 'training/:id', component: TrainingComponent},
    ])
  ],
  providers: [
    DeckService,
    DeckCardsService
  ]
})
export class DeckModule {
}
