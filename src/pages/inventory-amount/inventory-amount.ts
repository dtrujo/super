import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Articles, Inventories } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-inventory-amount',
  templateUrl: 'inventory-amount.html',
})
export class InventoryAmountPage {
  @ViewChild('input') myInput ;

  private articleForm : FormGroup;
  article: any;
  warehouse: any;
  inventory: any;
  location: any;
  
  /**
   * 
   * @param navCtrl 
   * @param navParams 
   */
  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public inventoriesServ: Inventories,
    public articlesServ: Articles,
    public navParams: NavParams ) {

    this.warehouse = [];

    // get article & waregouse using params
    this.article = navParams.get('article');
    this.inventory = navParams.get('inventory');
    this.location = navParams.get('location');

    // if we have ubication dont need call the service 
    // to load warehouse data for this specific article
    if (this.article.ubication){

      this.warehouse.ubication = this.article.ubication;
      this.warehouse.units = this.article.old_units;

    } else {

      // retrieve warehouses
      this.articlesServ.getArticleWarehouses( this.article.article_id ).subscribe( warehouses => {
      
      // convert
      let w: any = [];
      w = warehouses;
      
      // find warehouse 
        this.warehouse = w.filter( x => x.id == this.inventory.warehouse.id)[0];
      }); 
    }

    // is valid the article form
    this.articleForm = this.formBuilder.group({
      old_units: ['', Validators.required],
      new_units:['', Validators.required]
    });
  }

  /**
   *
   */
  addArticle() {

    // get units & ubication
    this.article['new_units'] = this.articleForm.value.new_units;
    this.article['old_units'] = this.articleForm.value.old_units;
    this.article['incidence'] = this.articleForm.value.old_units - this.articleForm.value.new_units;
    this.article['ubication'] = this.warehouse.ubication;
    this.article['observation'] = '';

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
      
      // control jumping
      let jump = this.navCtrl.length() == 8 ? 5 : 4; 
      this.navCtrl.popTo( this.navCtrl.getByIndex(jump));
    });
  }

  /**
   * 
   */
  ionViewDidLoad() {
    setTimeout(() => {
      this.myInput.setFocus();
    },500);
  }
}
