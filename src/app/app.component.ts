import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform, Events, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { FirstRunPage } from '../pages/pages';
import { Settings } from '../providers/providers';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MyApp {
  rootPage = '';

  @ViewChild(Nav) nav: Nav;

  /*
  pages: any[] = [
    { title: 'Articles', component: 'ArticlesPage'},
    { title: 'Clients', component: 'ClientsPage'},
    { title: 'Tutorial', component: 'TutorialPage' },
    { title: 'Welcome', component: 'WelcomePage' },
    { title: 'Tabs', component: 'TabsPage' },
    { title: 'Cards', component: 'CardsPage' },
    { title: 'Content', component: 'ContentPage' },
    { title: 'Login', component: 'LoginPage' },
    { title: 'Signup', component: 'SignupPage' },
    { title: 'Master Detail', component: 'ListMasterPage' },
    { title: 'Menu', component: 'MenuPage' },
    { title: 'Settings', component: 'SettingsPage' },
    { title: 'Search', component: 'SearchPage' }
  ]*/
  
  // page submenu
  pages: any[] = [
    { title: 'Dashboard', component: 'DashboardPage'},
    { title: 'Ventas', component: 'SalesPage'},
    { title: 'Articles', component: 'ArticlesPage'}
  ]

  // username
  name : string = '';

  /**
   * 
   * @param platform 
   * @param settings 
   * @param translate 
   * @param storage 
   * @param events 
   * @param config 
   * @param statusBar 
   * @param splashScreen 
   */
  constructor(
    platform: Platform, 
    settings: Settings, 
    public alertCtrl: AlertController,
    private translate: TranslateService, 
    private storage: Storage,
    private events: Events,
    private config: Config, 
    private statusBar: StatusBar, 
    private splashScreen: SplashScreen) {

    // get user from localstorage and control root page
    // if the user is in local storage we dont need go to login page
    // directly, we will go to main page
    storage.get('user').then( value => {
      if (value != null) {         
        this.name = value.name;
        this.rootPage = "DashboardPage";
      } else {
        this.rootPage = "TutorialPage";
      }
    })

    // the platform is ready
    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // subscribe to event when user logged in for refresh sidemenu 
      events.subscribe('user:loggedin', ( user ) => {
        this.name = user['username'];
      });

    });

    this.initTranslate();
  }

  /**
   * 
   */
  initTranslate() {

    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  /**
   * 
   */
  logout(){
    this.showConfirm();
  }

  /**
   * show alert to acept or not the logout action
   */
  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Logout',
      message: 'Are you sure do you want to logout?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.storage.remove('user');
            this.nav.setRoot('LoginPage');
          }
        }
      ]
    });
    confirm.present();
  }

  /**
   * 
   * @param page 
   */
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
