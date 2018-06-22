import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';

@Injectable()
export class User {
  user: any;

  /**
   * 
   * @param api 
   */
  constructor( public api: Api ) { }

  /**
   * get user using username and password
   * @param user 
   * @param password 
   */
  login(username : any, password : any) {
    let params = { 
      "login" : true ,
      "user" : username, 
      "password" : password
     };

    return this.api.get('users', params);
  }

  /**
   * get all warehouse for this user
   *  @param id 
   */
  getWareHouse(id : any){
    return this.api.get('warehouses/user/' + id);
  }

  /**
   * 
   */
  logout() {
  }
} 
