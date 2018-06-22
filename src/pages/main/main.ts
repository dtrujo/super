import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { Settings } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  /**
   * 
   * @param navCtrl
   * @param storage
   * @param settings
   * @param navParams 
   */
  constructor(
    public navCtrl: NavController,
    public storage : Storage,
    public menu : MenuController, 
    public settings: Settings,
    public navParams: NavParams) {   

    // enable menu un application
    this.menu.enable(true, 'mainMenu');
  }

  /**
   * 
   */
  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  /**
   * 
   */
  goToArticles(){
    this.navCtrl.push('ArticleSearchPage');
  }

  /**
   * 
   */
  goToWarehouses(){
    this.navCtrl.push('WarehouseListPage');
  }

  /**
   * 
   */
  goToClients(){
    this.navCtrl.push('ClientsPage');
  }
}
