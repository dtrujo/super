import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Articles, Inventories } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-inventory-relocate-article',
  templateUrl: 'inventory-relocate-article.html',
})
export class InventoryRelocateArticlePage {
  private articleForm : FormGroup;

  article: any;
  inventory: any;
  location: any;
  from: string;
  to:string;

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

    // get article warehouse details
    this.articlesServ.getArticleWarehouses( this.article.article_id ).subscribe( warehouses => {
      let w: any = [];
      w = warehouses;

      // get ubication for this article in the curren warehouse
      let warehouse = w.filter( x => x.id == this.inventory.warehouse.id)[0];

      this.from = warehouse.ubication;
      this.to = this.location.code;
    }); 

    // is valid the article form
    this.articleForm = this.formBuilder.group({
      units: ['', Validators.required]
    });
  }

  /**
   * 
   */
  relocate(){

    // add in the current location
    // get units & ubication
    this.article['new_units'] = this.articleForm.value.units;
    this.article['old_units'] = this.articleForm.value.units;
    this.article['incidence'] = 0;
    this.article['ubication'] = this.to;
    this.article['observation'] = '';

    if (this.to === this.location.code){

      // check if article exist
      let index_article = this.location.articles.indexOf(this.article);

      // remove article
      if(index_article > -1){
        this.location.articles.splice(index_article, 1);
        this.inventory['count']--;
      }

      // add article in to location
      this.location.articles.push(this.article);

      // update count
      this.inventory['count']++;
      this.location['count']++;

      // check if location exist
      let index_location = this.inventory.locations.indexOf(this.location);

      // remove location
      if(index_location > -1){
        this.inventory.locations.splice(index_location, 1);
      }

      // add location to inventory
      this.inventory.locations.push(this.location);
    } else {

      // create new location
      let newLocation = {
        "code" : this.to,
        "count" : 0,
        "articles" : []
      };

      // control if the article is repeated in this ubication
      let location = this.inventory.locations.find( l => l.code == newLocation.code );
     
      // if location exist we need to check the articles
      if (location) {

        // control if the article is repeated in this ubication
        let article = location.articles.find( a => a.article_id == this.article.article_id );
        let index_article = location.articles.indexOf(article);

        // remove article if exist
        if(index_article > -1){
          location.articles.splice(index_article, 1);
          this.inventory['count']--;
        }

        // add article in to location
        location.articles.push(this.article);

        // update count 
        this.inventory['count']++;
        location['count']++;

        // we need to get index of the new location to update article list
        let index_location = this.inventory.locations.indexOf(location);
        
        // remo location to update
        if(index_location > -1){
          this.inventory.locations.splice(index_location, 1);
        }
        
        // update
        this.inventory.locations.push(location);
      } else {

        // add article in the new ubication
        newLocation.articles.push(this.article);
        newLocation['count']++;

        // add new location 
        this.inventory.locations.push(newLocation);
      }   
    }

    // update the inventory in the storage;
    this.inventoriesServ.update( this.inventory).then( value => {
      this.navCtrl.popTo( this.navCtrl.getByIndex(4));
    });
  }

  /**
   * 
   */
  changeLocation(){
    let aux = this.to;
    this.to = this.from;
    this.from = aux;
  }
}
