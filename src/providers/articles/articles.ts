import { Injectable } from '@angular/core';
import { Api } from '../api/api';

@Injectable()
export class Articles {

  /**
   * 
   * @param api 
   */
  constructor( public api: Api ) {

  }

  /**
   * return all articles
   */
  getArticles( params?: any ) {
    console.log(params);
    return this.api.get('articles', params);
  }

  /**
   * return specific article by id
   * @param value 
   */
  getArticle(value: any){
    return this.api.get('articles/' + value);
  }

  /**
   * Retrieved all prices by article id
   * @param value 
   */
  getArticlePrices(value: any){
    return this.api.get('articles/' + value + '/prices');
  }

  /**
   * Retrieved all warehouses by article id
   * @param value 
   */
  getArticleWarehouses(value: any){
    return this.api.get('articles/' + value + '/warehouses');
  }

  /**
   * return specific article by code
   * @param value 
   */
  getArticleByCode(value: any){
    return this.api.get('articles/' + value, {"filterby" : "code"});
  }

  /**
   * 
   * @param id 
   * @param location 
   */
  reLocateArticle(id: any, location: any){    
    return this.api.put('articles/' + id , location );
  }

}
