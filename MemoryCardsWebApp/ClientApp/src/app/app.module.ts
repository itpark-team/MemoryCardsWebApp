import {NgModule, Provider} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from "./app-routing.module";
//AuthInterceptor
import {AppComponent} from './app.component';
import {AuthComponent} from './components/auth/auth.component'
import {SelectProfileComponent} from './components/select-profile/select-profile.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MaterialSharedModule} from "./shared/modules/material-shared.module";
import {LoginInputComponent} from './shared/components/inputs/login-input/login-input.component';
import {PasswordInputComponent} from './shared/components/inputs/password-input/password-input.component';
import {CheckboxComponent} from './shared/components/checkbox/checkbox.component';

import {SharedModule} from "./shared/modules/shared.module";

// import {DeckHomeComponent} from "./components/deck-home/deck-home.component";
// import {AddDeckDialog} from "./components/deck-home/deck-home.component";
// import {AddCardDialog, EditImageDialog} from "./components/deck-cards-home/deck-cards-home.component";
// import {DeleteDialog} from "./components/deck-cards-home/deck-cards-home.component";
// import {EditCardDialog} from "./components/deck-cards-home/deck-cards-home.component";
// import {EditDeckDialog} from "./components/deck-cards-home/deck-cards-home.component";
// import {ProjectHomeComponent} from "./components/project-home/project-home.component";
// import {DeckCardsHomeComponent} from "./components/deck-cards-home/deck-cards-home.component";
// import {AuthenticationHomeComponent} from "./components/authentication-home/authentication-home.component";
//
//
// import {AuthCheckService} from "./services/auth-check/auth-check.service";
//
// import {WrongLoginOrPasswordDialog} from "./components/authentication-home/authentication-home.component";
// import {NotFoundComponent} from "./components/not-found/not-found.component";
// import {TrainingHomeComponent} from './components/training-home/training-home.component';

// const appRoutes: Routes = [
//   {path: '', component: ProjectHomeComponent},
//   {path: 'decks', component: DeckHomeComponent, canActivate: [AuthCheckService]},
//   {path: 'deckcards/:id', component: DeckCardsHomeComponent, canActivate: [AuthCheckService]},
//   {path: 'auth', component: AuthenticationHomeComponent},
//   {
//     path: '**',
//     component: NotFoundComponent
//   }
// ];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SelectProfileComponent,
    LoginInputComponent,
    PasswordInputComponent,
    CheckboxComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialSharedModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
