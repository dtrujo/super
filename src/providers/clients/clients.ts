import { Injectable } from '@angular/core';
import { Api } from '../api/api';

@Injectable()
export class Clients {

  /**
   * 
   * @param api 
   */
  constructor( public api: Api ) { }

  /**
   * getClients: return all clients
   * @param params 
   */
  getClients(params?: any) {
    console.log(params);
    return this.api.get('clients', params);
  }

}
