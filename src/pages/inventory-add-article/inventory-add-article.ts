import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController, ViewController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { Articles } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-inventory-add-article',
  templateUrl: 'inventory-add-article.html',
})
export class InventoryAddArticlePage {
  id: any;
  error: boolean;
  options: BarcodeScannerOptions;
  inventory: any;
  location: any;

  // article
  article: { code: string } = {
    code: ''
  };

  /**
   * 
   * @param navCtrl 
   * @param navParams 
   */
  constructor(
    public navCtrl: NavController,
    public alertCtrl:AlertController,
    public articlesServ: Articles,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public barcodeScanner: BarcodeScanner,
    public navParams: NavParams) {

    // get inventory & location using params
    this.inventory = navParams.get('inventory');
    this.location = navParams.get('location');

    // control login request
    this.error = false;
  }

  /**
   * call article service to find article by code 
   */
  doSearch() {

    // loading present
    let loader = this.loadingCtrl.create({
      content: "Searching...",     
    });

    loader.present();

    this.articlesServ.getArticleByCode( this.article.code ).subscribe( data => {
      loader.dismiss();

      if (!data[0]){
        this.error = true;
      } else {

        this.articlesServ.getArticleWarehouses(
          data[0].article_id ).subscribe( warehouses => {
            
          let w: any = [];
          w = warehouses;
    
          // get ubication for this article in the curren warehouse
          let warehouse = w.filter( x => x.id == this.inventory.warehouse.id)[0];
      
          // check if the some ubication
          if (warehouse.ubication === this.location.code ) {
              
            // control if the article is repeated in this ubication
            let article = this.location.articles.find( 
              x => x.article_id == data[0].article_id 
            );

            if ( article ) {

              this.navCtrl.push('InventoryAddMoreArticlePage' , { 
                article : article, 
                inventory : this.inventory, 
                location: this.location
              });

            } else {

              this.navCtrl.push('InventoryAmountPage' , { 
                article : data[0], 
                inventory : this.inventory, 
                location: this.location
              });
            }

          } else {

            this.navCtrl.push('InventoryRelocateArticlePage' , { 
              article : data[0], 
              inventory : this.inventory, 
              location: this.location
            });

          }
        }); 

      }
    }); 
  }

  /**
   * 
   */
  showList(){
    this.navCtrl.push('ArticleListPage');
  }

  /**
   * 
   */
  scan() {

    // options
    this.options = { prompt : "Scan your barcode " }

    // scan
    this.barcodeScanner.scan( this.options ).then(( barcodeData ) => {
      this.article.code = barcodeData.text;
    }, (err) => {
      console.log("Error occured : " + err);
    });

  }

  /**
   * 
   */
  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticleSearchPage');
  }
}
