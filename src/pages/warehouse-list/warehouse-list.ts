import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Warehouses } from '../../providers/providers';
import { User } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-warehouse-list',
  templateUrl: 'warehouse-list.html',
})
export class WarehouseListPage {
  warehouses: any;

  /**
   * 
   * @param navCtrl 
   * @param navParams 
   */
  constructor( 
    public navCtrl: NavController,
    public storage: Storage,
    public user: User,
    public events: Events,
    public actionSheetCtrl: ActionSheetController,
    public warehousesServ: Warehouses, 
    public navParams: NavParams ) {

    // get all warehouses
    this.warehousesServ.getWarehouses( ).subscribe( data => {  
      this.warehouses = data;
    });

  }

  /**
   * 
   */
  ionViewDidLoad() {
    console.log('ionViewDidLoad WarehouseListPage');
  }

  /**
  * if user has permission we presented actions
  */
  presentActionSheet(warehouse : any) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Warehouses Actions',
      buttons: [{
          text: 'Inventory',
          handler: () => { 
            this.navCtrl.push('InventoryListPage', { warehouse : warehouse });
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
        }
      }]
    });
    actionSheet.present();
  }
}
