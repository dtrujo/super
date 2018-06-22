import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Clients } from '../../providers/providers';

@IonicPage()
@Component({ 
  selector: 'page-clients',
  templateUrl: 'clients.html',
})
export class ClientsPage {
  clients: any;
  limit: number = 10;
  offset: number = 0;

  /**
   * 
   * @param navCtrl 
   * @param navParams 
   * @param clientsServ 
   */
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public clientsServ: Clients) {
       
    this.clients = [];
    let params = {"limit": this.limit , "offset": this.offset};

    // get all client using limit and offset
    this.clientsServ.getClients( params ).subscribe( data => {   
      console.log(data);    
      this.clients = data;
    });
  }

  /**
   * 
   */
  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientsPage');
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
      this.clientsServ.getClients( params ).subscribe( data => {  
        for (var i in data) 
          this.clients.push(data[i]);
      });

      infiniteScroll.complete();
    }, 500);
  }

}