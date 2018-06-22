import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, Platform } from 'ionic-angular';

import { Inventories } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-inventorory-location-details',
  templateUrl: 'inventorory-location-details.html',
})
export class InventororyLocationDetailsPage {
  @ViewChild(Navbar) navbar: Navbar;

  articles: any;
  article: any;
  inventory: any;
  location: any;
  warehouse: any;

  /**
   *  
   * @param navCtrl
   * @param navParams
   */
  constructor(
    public navCtrl: NavController,
    public inventoriesServ: Inventories,
    private platform: Platform,
    public navParams: NavParams) {

    // get inventory and location using params
    this.inventory = navParams.get('inventory');
    this.location = navParams.get('location');
  }

  /**
   * 
   * @param article
   */
  removeArticle(article: any){

    // check if article exist
    let index = this.location.articles.indexOf(this.article);

    // remove article
    if(index > -1){
      this.location.articles.splice(index, 1);
      this.inventory['count'] -=1;
    }
 
    // add article in to location
    this.location.articles.push(this.article);
 
    // update count
    this.inventory['count']++;
    this.location['count'] = this.location.articles.length;
 
    // check if location exist
    index = this.inventory.locations.indexOf(this.location);
 
    // remove location
    if(index > -1){
      this.inventory.locations.splice(index, 1);
    }
 
    // add location to inventory
    this.inventory.locations.push(this.location);
 
    // update the inventory in the storage;
    this.inventoriesServ.update( this.inventory).then( value => {
      console.log(value);
    });
  }

  /**
   * 
   */
  ionViewDidEnter() {
    this.navbar.backButtonClick = () => {
      this.navCtrl.popTo( this.navCtrl.getByIndex(3));
    };
  }

  /**
   * 
   */
  ionViewDidLoad() {
  }

  /**
   * 
   */
  goToAddArticle(){    
    this.navCtrl.push('InventoryAddArticlePage' , { inventory: this.inventory , location: this.location });
  }
}
