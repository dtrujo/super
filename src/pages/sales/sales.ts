import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-sales',
  templateUrl: 'sales.html',
})
export class SalesPage {

  /**
   * 
   * @param navCtrl 
   * @param navParams 
   */
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  /**
   * 
   */
  ionViewDidLoad() {
    console.log('ionViewDidLoad SalesPage');
  }

  /**
   * 
   */
  goToClients(){
    this.navCtrl.push('ClientsPage');
  }
}
