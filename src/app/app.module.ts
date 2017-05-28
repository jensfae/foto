import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { SpinnerDialog } from '@ionic-native/spinner-dialog';

import { ListPage } from '../pages/list/list';
import { Antragsverwaltung } from '../pages/antragsverwaltung/antragsverwaltung';
import { AntragDetails } from '../pages/antrag-details/antrag-details';

import { Antragsliste } from '../pages/antragsliste/antragsliste';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { AngularFireModule } from 'angularfire2';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

import { AntragData } from '../providers/antrag';

import { Login } from '../pages/login/login';
import { Signup } from '../pages/signup/signup';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
    , Antragsverwaltung
    , Login
    , Signup
    ,AntragDetails
    , Antragsliste
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AntragDetails,
    ListPage
    , Antragsliste
    , Antragsverwaltung
    , Login
    , Signup
  ],
  providers: [
    StatusBar,
    SplashScreen,
     SpinnerDialog,
    File,
    Transfer,
    Camera,
    FilePath,
    AntragData,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
