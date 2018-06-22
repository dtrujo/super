import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Articles } from '../../providers/providers';

@IonicPage()
@Component({ 
  selector: 'page-articles',
  templateUrl: 'articles.html',
})
export class ArticlesPage {

  /**
   * 
   * @param navCtrl 
   * @param navParams 
   * @param articlesServ 
   */
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public articlesServ: Articles) {

  }

  /**
   * 
   */
  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  /**
   * 
   */
  goToArticles(){
    this.navCtrl.push('ArticleSearchPage');
  }

  /**
   * 
   */
  goToWarehouses(){
    this.navCtrl.push('WarehouseListPage');
  }
}
