import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { HomePage } from '../home/home';
import { AntragDetails } from '../antrag-details/antrag-details'

import { SpinnerDialog } from '@ionic-native/spinner-dialog';

import { AntragData } from '../../providers/antrag';


/**
 * Generated class for the Antragsliste page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({ name: 'antraege-list' })
@Component({
  selector: 'page-antragsliste',
  templateUrl: 'antragsliste.html',
})



export class Antragsliste {

  // antragsList: Array<any>; //Alter Code
  public antragsList: any;
  //this.passantragRef = firebase.storage().ref('/Photo/');
  //this.database = firebase.database().ref('/antraege/');

  constructor(public navCtrl: NavController, public navParams: NavParams, private spinner: SpinnerDialog, private _antrag_data: AntragData) {
    let that = this;


    this.antragsList = this._antrag_data.renderAntraege(); 
   // this._antrag_data.antraege.subscribe((data) => {that.antragsList.push(data);}, (err) => {console.error(err);});
  }


  goToEventDetail(antrag) {
    this.navCtrl.push(AntragDetails, { 'antrag': antrag });
  }

  getAntraegeListe(): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.database()
        .ref('/antraege')
        .orderByChild('name')
        .on('value', snapshot => {
          let rawList = [];
          snapshot.forEach(snap => {
            rawList.push({
              id: snap.key,
              name: snap.val().name,
              vorname: snap.val().vorname,
              gebDatum: snap.val().gebdatum,
              passAntragsURL: snap.val().passantragURL
            });
            return false
          });
          resolve(rawList);
        });
    });
  }


}
