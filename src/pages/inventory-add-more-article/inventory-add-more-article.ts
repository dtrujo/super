import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Articles, Inventories } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-inventory-add-more-article',
  templateUrl: 'inventory-add-more-article.html',
})
export class InventoryAddMoreArticlePage {
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

    // get article & waregouse using params
    this.article = navParams.get('article');
    this.inventory = navParams.get('inventory');
    this.location = navParams.get('location');

    // is valid the article form
    this.articleForm = this.formBuilder.group({
      old_units: ['', Validators.required],
      new_units:['', Validators.required]
    });

  }

  /**
   * add new units to article
   */
  addMoreUnitsArticle() {

     // get units & ubication
     this.article['new_units'] = parseInt( this.article['new_units']) + parseInt( this.articleForm.value.new_units);
     this.article['incidence'] = this.articleForm.value.old_units - this.articleForm.value.new_units;
     this.article['ubication'] = this.location.code;
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
       this.navCtrl.popTo( this.navCtrl.getByIndex(4));
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
