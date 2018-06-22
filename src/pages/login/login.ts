import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, LoadingController , Events, MenuController} from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { User } from '../../providers/providers';
import { Settings } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  error : boolean;

  user: { username: string, password: string } = {
    username: 'diego',
    password: 'test'
  };

  // Our translated text strings
  private loginErrorString: string;

  /**
   * 
   * @param navCtrl 
   * @param userServ 
   * @param toastCtrl 
   * @param translateService 
   */
  constructor(
    public navCtrl: NavController,
    public userServ: User,
    public menu: MenuController,
    public storage: Storage, 
    public events: Events,
    public settings: Settings,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public translateService: TranslateService) {

    // disable menu un login page
    this.menu.enable(false, 'mainMenu');

    // control login request
    this.error = false;

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  /**
   * 
   */
  configuration(){
    this.navCtrl.push('SettingsPage');
  }

  // Attempt to login in through our User service
  doLogin() {

    // loading present
    let loader = this.loadingCtrl.create({
      content: "Please wait...",     
    });

    loader.present();

    // check if user is login
    this.userServ.login( this.user.username, this.user.password ).subscribe( ( resp ) => {
      loader.dismiss();

      // user is login
      if (resp[0] != null){
        console.log(resp[0]);
        this.storage.set('user',resp[0]);
        this.events.publish('user:loggedin', resp[0]);
        this.navCtrl.setRoot(MainPage);
      } else {
        this.error = true;
      }
      
    })
  }
}
