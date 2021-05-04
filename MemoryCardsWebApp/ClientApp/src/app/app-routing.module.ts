import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './components/auth/auth.component';
import {SelectProfileComponent} from "./components/select-profile/select-profile.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import {NotFoundComponent} from "./components/not-found/not-found.component";

const routes: Routes = [
  {
    //TODO Create SurfModule
    path: '',
    loadChildren: () => import('./modules/surf/surf.module').then(s => s.SurfModule),
    canActivate: [AuthGuard]
  },
  {path: 'auth', component: AuthComponent},
  {path: 'profile', component: SelectProfileComponent, canActivate: [AuthGuard]},
  {
    path: 'deck',
    loadChildren: () => import('./modules/deck/deck.module').then(d => d.DeckModule),
    canActivate: [AuthGuard]
  },
  {path: '**', component: NotFoundComponent}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
