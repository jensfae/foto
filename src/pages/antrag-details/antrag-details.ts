import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Antragsliste } from '../antragsliste/antragsliste';
import { AntragData } from '../../providers/antrag';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

declare var cordova: any;
/**
 * Generated class for the AntragDetails page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-antrag-details',
  templateUrl: 'antrag-details.html',
})
export class AntragDetails {

  public form: FormGroup;
  public passantragURL: any = null;
  public passfotoURL: any = null;
  lastImage: string = null;
  loading: Loading;
  public passantragImage: String;
  pAntrag: any;
  constructor(public navCtrl: NavController, private camera: Camera, private transfer: Transfer, private file: File,
    private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController,
    public platform: Platform, public loadingCtrl: LoadingController, public fb: FormBuilder, public navParams: NavParams, public _antrag_data_prov: AntragData) {

    this.form = fb.group({
      "name": ["", Validators.required],
      "vorname": ["", Validators.required],
      "gebDatum": ["", Validators.required],
      "mitglied": [false, Validators.required]
    });


  }

  ionViewDidEnter() {
    this.pAntrag = this.navParams.get('antrag');
    if (this.pAntrag != undefined){
    this.form.controls["name"].setValue(this.pAntrag.name);
    this.form.controls["vorname"].setValue(this.pAntrag.vorname);
    this.form.controls["gebDatum"].setValue(this.pAntrag.gebdatum);
    this.passantragURL = this.pAntrag.passantragURL;

    if (this.pAntrag.mitglied != undefined)
      this.form.controls["mitglied"].setValue(this.pAntrag.mitglied);
    else this.form.controls["mitglied"].setValue(false);

    if (this.pAntrag.passfotoURL != undefined)
      this.passfotoURL = this.pAntrag.passfotoURL;
    else this.passfotoURL = "";
    }
    //this.antragID= antragSnap['id'];
    //});}


  }

  updateAntrag() {
    let name: string = this.form.controls["name"].value,
      vorname: string = this.form.controls["vorname"].value,
      gebdatum: string = this.form.controls["gebDatum"].value,
      passantragURL: string = this.passantragURL,
      passfotoURL: string = this.passfotoURL,
      mitglied: boolean = this.form.controls["mitglied"].value;

    if (this.pAntrag != undefined) {
      this._antrag_data_prov.updateAntrag(this.pAntrag.id,
        {
          name: name,
          vorname: vorname,
          gebdatum: gebdatum,
          passantragURL: passantragURL,
          passfotoURL: passfotoURL,
          mitglied: mitglied
        })
        .then((data) =>
        { });
    }
    else {
      this._antrag_data_prov.save( 
        {
          name: name,
          vorname: vorname,
          gebdatum: gebdatum,
          passantragURL: passantragURL,
          passfotoURL: passfotoURL,
          mitglied: mitglied
        })
    }
    this.goToAntraegeListe();

  }
  goToAntraegeListe() {
    //this.navCtrl.push(Antragsliste, {});
    this.navCtrl.setRoot(Antragsliste);
  }

  save() {
    console.log(this.passantragImage);
    this._antrag_data_prov.save_bild(this.passantragImage)
      ,
      (err) => {
        this.presentToast('Error while selecting image.');
      };

  }


  public presentActionSheet(imageType) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Bitte Quelle auswählen',
      buttons: [
        {
          text: 'Fotoalbum',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY, imageType);
          }
        },
        {
          text: 'Kamera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA, imageType);
          }
        },
        {
          text: 'Abbruch',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType, imageType) {
    // Create options for the Camera Dialog
    var options = {
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      quality: 90,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      targetWidth: 600,
      targetHeight: 600
    };

    // Get the data of an image
    this.camera.getPicture(options)
      .then(imageData => {
        console.log(imageType);
        switch (imageType) {

          case 'passantrag': {
            this._antrag_data_prov.save_bild(imageData)
              .then(image => {
                console.log('URL:' + image.downloadURL);
                this.passantragURL = image.downloadURL;
              })
            break;
          };
          case 'passfoto': {
            this._antrag_data_prov.save_bild(imageData)
              .then(image => {
                console.log('URL:' + image.downloadURL);
                this.passfotoURL = image.downloadURL;
              })
            break;
          };
        }



        //console.log('GetPic:' + this.passantragURL);


      },

      (err) => {
        this.presentToast('Error while selecting image.');
      });
  }
  /*
    private createFileName() {
      var d = new Date(),
        n = d.getTime(),
        newFileName = n + ".jpg";
      return newFileName;
    }
  
    // Copy the image to a local folder
    private copyFileToLocalDir(namePath, currentName, newFileName) {
      this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
        this.lastImage = newFileName;
        this.passantragURL = newFileName;
      }, error => {
        this.presentToast('Error while storing file.');
      });
    }
  */
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  /*
    // Always get the accurate path to your apps folder
    public pathForImage(img) {
      if (img === null) {
        return '';
      } else {
        return cordova.file.dataDirectory + img;
      }
    }
  */
}
