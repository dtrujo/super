import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Articles } from '../../providers/providers';
import { User } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-article-details',
  templateUrl: 'article-details.html',
})
export class ArticleDetailsPage {
  
  // Delete this when app will be in production
  // article: any = [{"article_code" : "CXU0014", "article_name" : "Análisis de desarrollo", "article_brand" : "CXU", "article_family" : "Análsis"}];
  // prices: any = [{"article_id":"23c487e4-8fa7-4dd1-a255-9a501d9cac81","tax_id":"926f3e77-a84f-4ac3-a86a-455126fd422e","warehouse_id":"45102c7e-d386-43a1-80bc-8a64d9a78571","price":"0","pricetypeid":"eea666bc-09a2-4f58-a96a-e6b5cf0b984e","id":"4c67d6f8-d7d8-4cf6-8203-86e8098b53b6","tax_code":"00","tax_value":"0","taxtype_id":"4c67d6f8-d7d8-4cf6-8203-86e8098b53b6","taxtype_code":"01","taxtype_info":"Exempt","price_code":"PR01","price_info":"Default"},{"article_id":"23c487e4-8fa7-4dd1-a255-9a501d9cac81","tax_id":"3a1bd4b7-0d50-4099-b721-2529b0c4a798","warehouse_id":null,"price":"400","pricetypeid":"eea666bc-09a2-4f58-a96a-e6b5cf0b984e","id":"a84dab65-39c5-439f-a7f9-43ff1dd92c08","tax_code":"07","tax_value":"7","taxtype_id":"a84dab65-39c5-439f-a7f9-43ff1dd92c08","taxtype_code":"02","taxtype_info":"IGIC","price_code":"PR01","price_info":"Default"}];
  
  article: any = [];
  prices: any = [];
  warehouses: any = [];

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
    public articlesServ: Articles, 
    public navParams: NavParams) {
    
    /*
    Delete this when app will be in production
    this.article = {
      "article_code" : "CXU0014", 
      "article_name" : "Análisis de desarrollo", 
      "brand_name" : "CXU", 
      "family_name" : "Análsis"
    };*/

    // get article
    this.article = navParams.get('article');
    
    // retrieve prices
    this.articlesServ.getArticlePrices(this.article.article_id).subscribe( prices => {
      this.prices = prices;
    });

    // retrieve warehouses
    this.articlesServ.getArticleWarehouses(this.article.article_id).subscribe( warehouses => {

      // get user warehouses and add icon and permission
      this.storage.get('user').then( value => {
        this.user.getWareHouse( value.id ).subscribe( w  =>{
          
          let userWarehouses : any = [];
          userWarehouses = w;

          for (var i in warehouses) {
            let _warehouse =  userWarehouses.find( x => x.id == warehouses[i].id );          
            warehouses[i].icon = ( _warehouse == null ? "lock" : "unlock");
          }
          this.warehouses = warehouses;
          console.log(this.warehouses);
        });
      });
    }); 

    // subscribe to event manager when ubication change
    this.events.subscribe('warehouse:changed', location => {
        this.warehouses.forEach( w => {
          var _location = JSON.parse(location);

          if ( w.warehouseid == _location.warehouse )
            w.ubication = _location.location;

        });
    });

  }

  /**
   * 
   */
  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticleDetailsPage');
  }

  /**
   * 
   */
  ionViewWillEnter(){

    
  }

  /**
   * if user has permission we presented actions
   */
  presentActionSheet(warehouse : any) {
 
    // if user can edit warehouse
    if (warehouse.icon == 'unlock'){
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Articles Actions',
        buttons: [{
            text: 'Relocation',
            handler: () => { 
              console.log(warehouse);
              this.navCtrl.push('ArticleRelocationPage', { article : this.article, warehouse : warehouse }); 
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
}
