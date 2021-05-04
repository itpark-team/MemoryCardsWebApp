import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginInputComponent} from "../components/inputs/login-input/login-input.component";
import {PasswordInputComponent} from "../components/inputs/password-input/password-input.component";
import {AddDeckComponent} from "../components/dialogs/add-deck/add-deck.component";
import {AddCardComponent} from "../components/dialogs/add-card/add-card.component";
import {MaterialSharedModule} from "./material-shared.module";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    LoginInputComponent,
    PasswordInputComponent,
    AddDeckComponent,
    AddCardComponent,
  ],
  imports: [
    CommonModule,
    MaterialSharedModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    MaterialSharedModule,
    LoginInputComponent,
    PasswordInputComponent,
    AddDeckComponent,
    AddCardComponent,
  ]
})
export class SharedModule {
}
