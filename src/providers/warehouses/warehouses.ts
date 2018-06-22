import { Injectable } from '@angular/core';
import { Api } from '../api/api';

@Injectable()
export class Warehouses {

  /**
   * 
   * @param api 
   */
  constructor( public api: Api ) {}
 
  /**
   * return all Warehouses
   */
  getWarehouses( ) {
    return this.api.get('warehouses');
  }
}
