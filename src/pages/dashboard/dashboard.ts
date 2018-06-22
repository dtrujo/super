import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Bills } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  total: number;

  /**
   * 
   * @param navCtrl 
   * @param navParams 
   */
  constructor(
    public billsServ: Bills,
    public navCtrl: NavController, 
    public menu : MenuController, 
    public navParams: NavParams ) {
    
    this.total = 0;

    // enable menu un application
    this.menu.enable(true, 'mainMenu');
  }

  doRefresh(refresher) {
    let params = {"from": "'2018-05-29'" , "to": "'2018-05-30'"};

    this.billsServ.getClientBillTotalByDate( params ).subscribe( data => {  
      this.total = data[0].sum;
      refresher.complete();
    });
  }

  /**
   * 
   */
  ionViewWillEnter(){
    console.log('pipi');
    let params = {"from": "'2018-05-29'" , "to": "'2018-05-30'"};

    // get all articles using limit and offset
    this.billsServ.getClientBillTotalByDate( params ).subscribe( data => {  
      this.total = data[0].sum;
    });

  }

  /**
   * 
   */
  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

}
