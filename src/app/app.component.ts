import { Component, ViewChild} from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Antragsliste } from '../pages/antragsliste/antragsliste';
import { Antragsverwaltung } from '../pages/antragsverwaltung/antragsverwaltung';
import { AntragDetails } from '../pages/antrag-details/antrag-details';

//import { AngularFire } from 'angularfire2';
import firebase from 'firebase';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Antragsliste;


  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    
    
    firebase.initializeApp({
      apikey: "AIzaSyDk3J3uw-xqjkiGhhUpnWJBAQM6qaY9vdg",
      authDomain: "esv-trainer.firebaseapp.com",
      databaseURL: "https://esv-trainer.firebaseio.com",
      storageBucket: "esv-trainer.appspot.com",
      messagingSenderID: "433946222653"
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Anträge', component: Antragsverwaltung },
      { title: 'Pass-Anträge', component: Antragsliste },
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Antrag-Detail', component:  AntragDetails }

    ];
    this.initializeApp();

/*
    //Login********************
    this.zone = new NgZone({});
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      this.zone.run(() => {
        if (!user) {
          this.rootPage = 'login';
          unsubscribe();
        } else {
          this.rootPage = HomePage;
          unsubscribe();
        }
      });
    });
*/
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
