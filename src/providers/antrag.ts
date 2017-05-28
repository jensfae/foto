import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import {ReplaySubject} from 'rxjs/ReplaySubject';
import { Observable } from "rxjs/Observable";
import firebase from 'firebase';


/*
  Generated class for the Antrag provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()

class Antrag{
  public name: string;
  public vorname: string;
  public gebdatum: string;
  public passantragURL: string;
  public id: string;

  constructor()
  {
    this.name='';
    this.vorname='';
    this.gebdatum='';
    this.passantragURL='';
    this.id='';
  }
}

export class AntragData {

  private passantragRef: any;
  private database: any;
  private _AntragRef: any;
  private _Antrag$: any;

  constructor() {
    console.log('Hello Antrag Provider');
    this.passantragRef = firebase.storage().ref('/Photo/');
    this._AntragRef = firebase.database().ref('/antraege/');

   // this._AntragRef.on('child_added', this.handleData, this); 
    this._Antrag$ = new ReplaySubject();
    
  }


renderAntraege() : Observable<any>
   {
       try {
         return new Observable(observer =>
         {
            let antraege : any = [];
            this._AntragRef.orderByChild('name')
            .once ('value', snapshot => {
              let rawList =[];
              snapshot.forEach (snap => {
                antraege.push({
                  id: snap.key,
                  name: snap.val().name,
                  vorname: snap.val().vorname,
                  gebdatum: snap.val().gebdatum,
                  passantragURL: snap.val().passantragURL,
                  passfotoURL: snap.val().passfotoURL,
                  mitglied: snap.val().mitglied
                });
                observer.next(antraege);
               observer.complete();
              }
              
              )
              //antraege.push(rawList);
            },
          /*
             .once('value', (items : any) =>
            {
               items.forEach((item) =>
               {
                  antraege.push(item.val());
               });

               observer.next(antraege);
               observer.complete();
            },
           
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
*/
            (error) =>
            {
              console.log("Observer error: ", error);
              console.dir(error);
              observer.error(error)
            });

         });
      }
      catch(error)
      {
         console.log('Observable for retrieving films fails');
         console.dir(error);
      }
   }
   


  get antraege() {
    return this._Antrag$;
  }

  private handleData(snap)
  {
    try {
     
      this._Antrag$.next(snap.val())
    }
    catch (error)
    {
      console.log('Fehler:', error)
    }

  }

  save (antrag)
  {
    return this._AntragRef.push(antrag).key;
  }


  updateAntrag(id, antragObj) : Promise<any>
   {
      return new Promise((resolve) =>
      {
         var updateRef = this._AntragRef.child(id);
	       updateRef.update(antragObj);
         resolve(true);
      });
   }


  save_bild(bild_data) : Promise <any>
  { 
    let uploadedImage: any,
        storageRef: any;

    return new Promise ((resolve, reject) =>
    
    {  
      
      storageRef = firebase.storage().ref('/Photo/').child(Math.ceil( Math.random() * 1000000) +'.png')
      uploadedImage = storageRef.putString(bild_data,'base64', { contentType: 'image/png' })
      
      uploadedImage.on('state_changed', (_snapshot) =>
         {
            // We could log the progress here IF necessary
            // console.log('snapshot progess ' + _snapshot);
         },
         (_err) =>
         {
            reject(_err);
         },
         (success) =>
         {
            resolve(uploadedImage);
         });
   
       
      });
   
    
    };
  
  }


