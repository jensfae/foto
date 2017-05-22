import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Camera } from '@ionic-native/camera';
import firebase from 'firebase';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [[Camera]]
})
export class HomePage {
  public form: FormGroup;
  public name: String = "Me";
  public vorname: String = "You";
  public gebDatum: Date;
  public nuLigaEingabe: boolean = false;

  public uploadTask: any;

  public passantragRef: any;
  public passantragPhoto: any;
  public passantragURL: any = null;
  public passantragUploadDone: boolean = false;
  public passBild: any;
  public passBildURL: any;
  public database: any;
  public antragID: any;

  constructor(public navCtrl: NavController,public navParams: NavParams, public fb: FormBuilder, private camera: Camera) {

    this.passantragRef = firebase.storage().ref('/Photo/');
    this.database = firebase.database().ref('/antraege/');

    this.form = fb.group({
      "name": ["", Validators.required],
      "vorname": ["", Validators.required],
      "gebDatum": ["", Validators.required]
    });
  }


ionViewDidEnter(){
  try{
    if (this.navParams.get('antragId')!=""){
  this.getAntragDetail(this.navParams.get('antragId'))
  .then( antragSnap => {
    this.form.controls["name"].setValue(antragSnap['name']);
    this.form.controls["vorname"].setValue(antragSnap['vorname']);
    this.form.controls["gebDatum"].setValue(antragSnap['gebDatum']);
    this.passantragURL=antragSnap['passantragURL'];
    this.antragID= antragSnap['id'];
  });}
}
catch(e){}
}

getAntragDetail(antragId): Promise<any> {
  return new Promise( (resolve, reject) => {
    firebase.database()
    .ref('/antraege/')
    .child(antragId).on('value', snapshot => {
      resolve({
        id: snapshot.key,
        name: snapshot.val().name,
        vorname: snapshot.val().vorname,
        gebDatum: snapshot.val().gebdatum,
        passantragURL:snapshot.val().passantragURL
        
      });
    });
  });
}


  takePhoto(art: Number) {
    console.log("Art: " + art);
    this.camera.getPicture({
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: true,
      targetWidth: 600,
      targetHeight: 600
    }).then(imageData => {
      if (art = 1) {
        this.passantragPhoto = imageData;
        // this.uploadBild();
        this.name = this.form.controls["name"].value;
      this.vorname = this.form.controls["vorname"].value;
      this.gebDatum = this.form.controls["gebDatum"].value;
        this.uploadBild(this.passantragPhoto, 'Passantrag', this.name + "-" + this.vorname + "-" + this.gebDatum)
        //this.passantragURL = imageData.downloadURL;
      }
      else {
        this.passBild = imageData;
      }


    }, error => {
      console.log("Fehler -->" + JSON.stringify(error))
    });
  }
  selectPhoto(art: Number) {
    this.camera.getPicture({
      quality: 50,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: true,
      targetWidth: 600,
      targetHeight: 600
    }).then(imageData => {
      if (art = 1) {

        this.passantragPhoto = imageData;
        this.name = this.form.controls["name"].value;
      this.vorname = this.form.controls["vorname"].value;
      this.gebDatum = this.form.controls["gebDatum"].value;
        this.uploadBild(this.passantragPhoto, 'Passantrag', this.name + "-" + this.vorname + "-" + this.gebDatum)
        //this.passantragURL = imageData.downloadURL;
        //   this.uploadBild();
      }
      else {
        this.passBild = imageData;
      }

    }, error => {
      console.log("Fehler -->" + JSON.stringify(error))
    });
  }

  private uploadBild(bild: any, name: String, verzeichnis: String): any {
    var url: any;
    this.uploadTask = this.passantragRef.child(verzeichnis).child(name + '.png')
      .putString(this.passantragPhoto, 'base64', { contentType: 'image/png' })
      .then((savedPicture) => {
        this.passantragUploadDone = true;
        this.passantragURL = savedPicture.downloadURL;
        url = savedPicture.downloadURL;;
        //return savedPicture.downloadURL;
      })
    return url;
  }


  saveData() {
    //    this.database.push({titel: 'Was auch immer', name: "Meier", photo: this.myPhotoURL});
    if (this.form.valid) {

      this.name = this.form.controls["name"].value;
      this.vorname = this.form.controls["vorname"].value;
      this.gebDatum = this.form.controls["gebDatum"].value;

      try {
        // this.passantragURL = this.uploadBild(this.passantragPhoto, 'Passantrag', this.name + "-" + this.vorname + "-" + this.gebDatum)
        //this.passBildURL = this.uploadBild(this.passBild, 'Passbild', this.name + "-" + this.vorname + "-" + this.gebDatum)
      }
      catch (e) { }

      this.database.push({ name: this.name, vorname: this.vorname, gebdatum: this.gebDatum, passantragURL: this.passantragURL, bearbeitet: false })
      this.name = null;
      this.vorname = null;
      this.gebDatum = null;
      this.passBildURL = null;

    }


    else {
      console.log("Fehler");
    }
  }

  deleteAntrag() {

    
    firebase.database()
      .ref('/antraege/')
      .child(this.antragID)
      .remove()
      .then(newEvent => {
        
        this.navCtrl.pop();
      }, function (error) {
        console.log("Error:", error);
      });

  }
}
