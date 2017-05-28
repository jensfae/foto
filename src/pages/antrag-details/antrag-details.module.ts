import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AntragDetails } from './antrag-details';

@NgModule({
  declarations: [
    AntragDetails,
  ],
  imports: [
    IonicPageModule.forChild(AntragDetails),
  ],
  exports: [
    AntragDetails
  ]
})
export class AntragDetailsModule {}
