import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Antragsliste } from '../antragsliste/antragsliste';
import { HomePage } from '../home/home';
/**
 * Generated class for the Antragsverwaltung tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
@Component({
  selector: 'page-antragsverwaltung',
  templateUrl: 'antragsverwaltung.html'
})
@IonicPage()
export class Antragsverwaltung {

  tab1Root: any = Antragsliste;
  tab2Root: any = HomePage;

  constructor(public navCtrl: NavController) {}

}
