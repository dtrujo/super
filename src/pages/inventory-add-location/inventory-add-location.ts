import { ContentPageModule } from './../content/content.module';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

import { Inventories } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-inventory-add-location',
  templateUrl: 'inventory-add-location.html',
})
export class InventoryAddLocationPage {
  id: any;
  error: boolean;
  options: BarcodeScannerOptions;
  warehouse: any;
  inventory: any;
  
  // location
  location: { code: string } = {
    code: ''
  };

  /**
   * 
   * @param navCtrl
   * @param navParams
   */
  constructor(
    public navCtrl: NavController,
    public inventoriesServ: Inventories,
    public loadingCtrl: LoadingController,
    public barcodeScanner: BarcodeScanner,
    public navParams: NavParams) {

    // get inventory using params
    this.inventory = navParams.get('inventory');
  }

  /**
   * 
   */
  scan() {

    // options
    this.options = { prompt : "Scan your barcode " }

    // scan
    this.barcodeScanner.scan( this.options ).then(( barcodeData ) => {
      this.location.code = barcodeData.text;
    }, (err) => {
      console.log("Error occured : " + err);
    });

  }
  
  /**
   * 
   */
  load(){
    
    // create new location
    let newLocation = {
      "code" : this.location.code,
      "count" : 0,
      "articles" : []
    };

    // add new location 
    this.inventory.locations.push(newLocation);
  
    // update inventory
    this.inventoriesServ.update(this.inventory);

    // go to location details
    this.navCtrl.push('InventororyLocationDetailsPage' , { inventory : this.inventory , location : newLocation });
  }

  /**
   * 
   */
  ionViewDidLoad() {
    console.log('ionViewDidLoad InventoryAddLocationPage');
  }

}
