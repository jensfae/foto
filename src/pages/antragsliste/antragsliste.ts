import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { HomePage } from '../home/home';
/**
 * Generated class for the Antragsliste page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage( {name: 'antraege-list'})
@Component({
  selector: 'page-antragsliste',
  templateUrl: 'antragsliste.html',
})
export class Antragsliste {

  antragsList:  Array<any>;
    //this.passantragRef = firebase.storage().ref('/Photo/');
    //this.database = firebase.database().ref('/antraege/');

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      
      //this.antragsList = this.getAntraegeListe();
  }

  ionViewWillEnter() {
    //this.antragsList = this.getAntraegeListe();
    
     this.getAntraegeListe().then( eventListSnap => {
    this.antragsList = eventListSnap;
  });
    
    console.log('ionViewDidLoad Antragsliste');
  }
 
 goToEventDetail(antragId){
  this.navCtrl.push(HomePage, { 'antragId': antragId });
}

getAntraegeListe(): Promise<any> {
  return new Promise( (resolve, reject) => {
    firebase.database()
    .ref('/antraege')
    .on('value', snapshot => {
      let rawList = [];
      snapshot.forEach( snap => {
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
