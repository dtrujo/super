import { InventoryDetailsPage } from './../inventory-details/inventory-details';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Inventories } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-inventory-list',
  templateUrl: 'inventory-list.html',
})
export class InventoryListPage {
  inventories:any;
  warehouse:any;
  user:any;

  /**
   * 
   * @param navCtrl 
   * @param navParams 
   */  
  constructor (
    public navCtrl: NavController, 
    public inventoriesServ: Inventories,
    public storage: Storage,
    public alertCtrl: AlertController, 
    public navParams: NavParams ) {

    this.inventories = [];

    // get user
    this.storage.get('user').then( value => {
      if (value != null)          
        this.user = value;
    })

    // get inventory using params
    this.warehouse = navParams.get('warehouse');
  } 

  /**
   * 
   */
  createInventory(){

    // create a pipe to add this one 
    var d = new Date();

    let year =   d.getFullYear().toString();
    let month = ((d.getMonth() + 1) < 10 ? '0' : '') + (d.getMonth() + 1);
    let day =  (d.getDate() < 10 ? '0' : '') + d.getDate();
    let hour = (d.getHours() < 10 ? '0' : '') + d.getHours();
    let minute = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    let second = (d.getSeconds() < 10 ? '0' : '') + d.getSeconds();

    let id =   
      year.toString() + month.toString() + day.toString() +
      hour.toString() + minute.toString() + second.toString();

    let inventory = {
      'id' : id,
      'code' : id,
      'user' : this.user,
      'observation' : '',
      'count': 0,
      'dateCreated' : day.toString() + '/' + month.toString() + '/' + d.getFullYear().toString(), 
      'dateSent' : '', 
      'isSent' : false, 
      'warehouse' : this.warehouse,
      'locations': []
    }

    this.inventoriesServ.add(id, inventory).then( value => {
      this.navCtrl.push('InventoryDetailsPage', { inventory : value });
    });
  }

  /**
   * 
   * @param inventory
   */
  removeInventory(inventory: any, e: Event){
    let confirm = this.alertCtrl.create({
      title: 'Delete',
      message: 'Are you sure that you want to delete the article?',
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

            // get index to the list
            let index = this.inventories.indexOf(inventory);
            
            // remove to the list
            if(index > -1){
              this.inventories.splice(index, 1);
            }

            // remove to the storage
            this.inventoriesServ.remove(inventory.id);
          }
        }
      ]
    });
    confirm.present();

    // we need stop the progration
    e.stopPropagation();
  }

  /**
   * show inventory details
   * @param inventory 
   */
  inventoryDetails(inventory: any){
    this.navCtrl.push('InventoryDetailsPage' , { inventory : inventory });
  }

  /**
   * 
   */
  ionViewWillEnter(){
     // load all inventories
     this.inventoriesServ.load().then(value => {
      this.inventories = value;
    });
  }

  /**
   * 
   */
  ionViewDidLoad() {
    console.log('ionViewDidLoad InventoryListPage');
  }

  /**
   * 
   */
  ionViewDidEnter(){
    console.log('ionViewDidEnter InventoryListPage');
  }
}
