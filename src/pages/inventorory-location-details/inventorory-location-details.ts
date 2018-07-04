import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, Platform, AlertController, ModalController } from 'ionic-angular';

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
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
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
  removeArticle(article: any, e: Event){

    let confirm = this.alertCtrl.create({
      title: 'Delete',
      message: 'Are you sure that you want to delete the article?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {}
        },
        {
          text: 'Agree',
          handler: () => {
               
            // check if article exist
            let index = this.location.articles.findIndex( 
              a => a.article_id === article.article_id );

            // remove article
            if(index > -1){
              this.location.articles.splice(index, 1);
              this.inventory['count'] -=1;
            }
        
            // location new lenght
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
        }
      ]
    });
    confirm.present();

    // we need stop the progration
    e.stopPropagation();
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
  articleInventoryAmount(article: any){
    this.navCtrl.push('InventoryAmountPage', {
      article : article, 
      inventory : this.inventory, 
      location: this.location
    });
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
    //let contactModal = this.modalCtrl.create('InventoryAddArticlePage', { inventory: this.inventory , location: this.location });
    //contactModal.present();
  
  }
}
 