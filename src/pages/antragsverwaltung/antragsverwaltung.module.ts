import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Antragsverwaltung } from './antragsverwaltung';

@NgModule({
  declarations: [
    Antragsverwaltung,
  ],
  imports: [
    IonicPageModule.forChild(Antragsverwaltung),
  ]
})
export class AntragsverwaltungModule {}
