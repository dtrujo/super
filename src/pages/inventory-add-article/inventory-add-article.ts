import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
  warehouse: any;
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
    public articlesServ: Articles,
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

    // search article by code
    this.articlesServ.getArticleByCode( this.article.code ).subscribe( data => {
      loader.dismiss();

      if (!data[0]){
        this.error = true;
      } else {
        this.navCtrl.push('InventoryAmountPage' , { article : data[0] , inventory : this.inventory , location: this.location });
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
      console.log(barcodeData);
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
