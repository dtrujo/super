import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Articles } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-article-list',
  templateUrl: 'article-list.html',
})
export class ArticleListPage {
  articles: any;
  limit: number = 100;
  offset: number = 0;
  
  /**
   * 
   * @param navCtrl 
   * @param navParams 
   * @param articlesServ 
   */
  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public loadingCtrl: LoadingController,
    public articlesServ: Articles  ) {
      
    this.articles = [];
    let params = {"limit": this.limit , "offset": this.offset};

    let loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });

    loading.present();

    // get all articles using limit and offset
    this.articlesServ.getArticles( params ).subscribe( data => {  
      this.articles = data;
      loading.dismiss();
    });

  }

  /**
   * 
   * @param infiniteScroll 
   */
  doInfinite(infiniteScroll) {

    setTimeout(() => {

      this.offset += this.limit;
      let params = {"limit": this.limit , "offset": this.offset};

      // get all articles using limit and offset
      this.articlesServ.getArticles( params ).subscribe( data => {  
        for (var i in data) 
          this.articles.push(data[i]);
      });

      infiniteScroll.complete();
    }, 500);
  }

/**
 * show article details
 * @param article 
 */
  articleDetails(article: any){
    this.articlesServ.getArticleByCode( article.code ).subscribe( data => {
      this.navCtrl.push('ArticleDetailsPage' , { article : data[0] });
    });
  }

  /**
   * 
   */
  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticleListPage');
  }

}
