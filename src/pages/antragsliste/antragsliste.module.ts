import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Antragsliste } from './antragsliste';

@NgModule({
  declarations: [
    Antragsliste,
  ],
  imports: [
    IonicPageModule.forChild(Antragsliste),
  ],
  exports: [
    Antragsliste
  ]
})
export class AntragslisteModule {}
