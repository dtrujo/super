import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Settings } from '../settings/settings';

@Injectable()
export class Api {
  url : string = 'http://192.168.1.1/api_v1';

  /**
   * 
   * @param http 
   * @param events 
   * @param storage 
   */
  constructor( 
    public http: HttpClient, 
    public events: Events, 
    public storage: Storage) {

    // subscribe to event when settings change
    events.subscribe('settings:onChanged', ( settings ) => {
      this.url = 'http://' +  settings['domain'] + '/api_v1';
    });
  }

  /**
   * 
   */
  ionViewDidEnter	(){
    // get user from localstorage
      this.storage.get('_settings').then( value => {
      this.url = 'http://' +  value['domain'] + '/api_v1';
    })
  }

  /**
   * 
   */
  ngOnInit() { }

  /**
   * 
   * @param endpoint 
   * @param params 
   * @param reqOpts 
   */
  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }
    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }

  /**
   * 
   * @param endpoint 
   * @param body 
   * @param reqOpts 
   */
  post(endpoint: string, body: any, reqOpts?: any) {

    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');

    return this.http.post(this.url + '/' + endpoint, body, {headers:headers}); 
  }

  /**
   * 
   * @param endpoint 
   * @param body 
   * @param reqOpts 
   */
  put(endpoint: string, body: any, reqOpts?: any) {    
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  /**
   * 
   * @param endpoint 
   * @param reqOpts 
   */
  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  /**
   * 
   * @param endpoint 
   * @param body 
   * @param reqOpts 
   */
  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
  }
}
