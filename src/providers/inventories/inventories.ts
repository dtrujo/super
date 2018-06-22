import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import { Storage } from '@ionic/storage';

@Injectable()
export class Inventories {
  private INVENTORY_KEY = 'inventories';
  inventories : Array<any>;

  /**
   * 
   * @param storage 
   */
  constructor( 
    public storage: Storage, 
    public api: Api 
  ) {
    this.load().then( value => {
      this.inventories = ( value == null ? [] : value);
    });
  }

  /**
   * 
   * @param inventory 
   */
  upload(inventory: any){
    return this.api.post('inventories' , inventory);
  }

  /**
   * 
   * @param key 
   * @param value 
   */
  add(key: string, value: any) {
    this.inventories.push(value);
    return this.storage.set(this.INVENTORY_KEY, JSON.stringify(this.inventories)).then( element => {
      return value; 
    });
  }

  /**
   * 
   * @param inventory 
   */
  update(inventory: any){
    this.remove(inventory.id);

    // add inventory
    return this.add(inventory.id, inventory).then( i => {
      return i;
    });
  }

  /**
   * 
   */
  load() {
    return this.storage.get(this.INVENTORY_KEY).then( ( val ) => {
      return JSON.parse(val);
    });
  }

  /**
   * 
   */
  remove(id: any){
    
    // remove inventory object
    this.inventories = this.inventories.filter(
      obj => obj !== this.inventories.find( x => x.id == id)
    );
    
    // update inventories in the memory
    this.storage.set(this.INVENTORY_KEY, JSON.stringify(this.inventories));
  }
}
