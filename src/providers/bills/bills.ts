import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';

@Injectable()
export class Bills {

  /**
   * 
   * @param http 
   * @param api 
   */
  constructor(
    public http: HttpClient,
    public api: Api ) {
  }

  /**
   * return total bills by date
   */
  getClientBillTotalByDate( params?: any ) {
    console.log('popo');
    return this.api.get('bill/total', params);
  }
}
