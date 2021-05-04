import {NgModule} from '@angular/core';

import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from "@angular/material/dialog";


const MODULES = [
  MatButtonModule,
  MatGridListModule,
  MatCardModule,
  MatDialogModule
];

@NgModule({
  imports: MODULES,

  exports: MODULES,
})
export class MaterialSharedModule {

}
