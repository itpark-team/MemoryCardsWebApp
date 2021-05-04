import {NgModule, Provider} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from "./app-routing.module";
//TODO AuthInterceptor
import {AppComponent} from './app.component';
import {AuthComponent} from './components/auth/auth.component'
import {SelectProfileComponent} from './components/select-profile/select-profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginInputComponent} from './shared/components/inputs/login-input/login-input.component';
import {PasswordInputComponent} from './shared/components/inputs/password-input/password-input.component';
import {CheckboxComponent} from './shared/components/checkbox/checkbox.component';
import {SharedModule} from "./shared/modules/shared.module";
import { DeleteConfirmComponent } from './shared/components/dialogs/delete-confirm/delete-confirm.component';
import { EditDeckComponent } from './shared/components/dialogs/edit-deck/edit-deck.component';
import { EditCardComponent } from './shared/components/dialogs/edit-card/edit-card.component';
import { EditImageComponent } from './shared/components/dialogs/edit-image/edit-image.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SelectProfileComponent,
    LoginInputComponent,
    PasswordInputComponent,
    CheckboxComponent,
    DeleteConfirmComponent,
    EditDeckComponent,
    EditCardComponent,
    EditImageComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
