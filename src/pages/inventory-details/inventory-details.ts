import { Warehouses } from './../../providers/warehouses/warehouses';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';

import { Inventories } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-inventory-details',
  templateUrl: 'inventory-details.html',
})
export class InventoryDetailsPage {
  articles: any;
  article: any;
  inventory: any;
  canUpload: boolean = true;
  warehouse: any;
  incidences: number = 0;

  /**
   * 
   */
  constructor (
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public inventoriesServ: Inventories,
    public navParams: NavParams ) {

    // get inventory using params
    this.inventory = navParams.get('inventory');
  }

  /**
   * 
   * @param location 
   */
  checkIncidences(location: any){ 

    let incidences = 0;
    location.articles.forEach(article => {
      if (article.old_units != article.new_units)
        incidences++;
    });

    return incidences;
  }

  /**
   * 
   * @param location 
   * @param e 
   */
  removeLocation( location: any, e: Event ){

    let confirm = this.alertCtrl.create({
      title: 'Delete',
      message: 'Are you sure that you want to delete the location?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {

            // get index to the list
            let index = this.inventory.locations.indexOf(location);
            
            // remove to the list
            if(index > -1){
              this.inventory.locations.splice(index, 1);
              this.inventory['count'] -= location.count;
            }

            // update inventory
            this.inventoriesServ.update(this.inventory);

            // check if can upload inventory
            this.checkCanUpload();
          }
        }
      ]
    });
    confirm.present();

    // we need stop the progration
    e.stopPropagation();
  }

  /**
   * 
   */
  uploadInventory(){

    let confirm = this.alertCtrl.create({
      title: 'Upload',
      message: 'Está seguro que quieres subir el inventario. Una vez subido quedará bloqueado',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {}
        },
        {
          text: 'Upload',
          handler: () => {

            // create loading
            let loading = this.loadingCtrl.create({
              content: 'Please wait...'
            });
          
            // show loading
            loading.present();

            var d = new Date();
            
            let year =   d.getFullYear().toString();
            let month = (((d.getMonth() + 1) < 10 ? '0' : '') + (d.getMonth() + 1));
            let day =  (d.getDate() < 10 ? '0' : '') + d.getDate();
            let hour = (d.getHours() < 10 ? '0' : '') + d.getHours();
            let minute = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
            let second = (d.getSeconds() < 10 ? '0' : '') + d.getSeconds();

            let dateSent =   
              year.toString() + '/' + month.toString() + '/' + day.toString() + ' ' + 
              hour.toString() + ':' + minute.toString()+ ':' + second.toString();

            this.inventory['dateSent'] = dateSent;

            // upload inventory
            this.inventoriesServ.upload(this.inventory).subscribe( data => {
              let message = '';

              // if the inventory has been uploaded successfully update the local storage
              if ( data['success'] == 1 ){

                this.inventory['isSent'] = true;
                this.inventoriesServ.update(this.inventory);
                message = "El inventario se ha subido correctamente";               
              
              } else {
                message = data['error'];
              }

              loading.dismiss();
        
              // present totast
              this.presentToast( message );

            })
          }
        }
      ]
    });
    confirm.present();

  }

  /**
   * show toast message
   * @param message
   */
  presentToast( message : any) {

    // creat toast object
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: 'OK'
    });
  
    // dismiss
    toast.onDidDismiss(() => {
      this.navCtrl.pop();
    });
  
    toast.present();
  }

  /**
   * 
   * @param location 
   */
  locationsDetails(location: any) {
    this.navCtrl.push('InventororyLocationDetailsPage' , { inventory : this.inventory , location : location });
  }
 
  /**
   * 
   */
  goToAddLocation() {    
    this.navCtrl.push('InventoryAddLocationPage' , { inventory: this.inventory });
  }  

 /**
  * 
  */
  ionViewDidEnter(){
    this.checkCanUpload();
  }

  /**
   * 
   */
  checkCanUpload(){
    if (this.inventory.isSent || this.inventory.locations.length < 1){
      this.canUpload = true;
    } else {
      if (!this.inventory.isSent && this.inventory.locations.length > 0){
        for (var location of this.inventory.locations) 
          this.canUpload = location.articles.length > 0 ? false : true;
      } 
    }
  }

}
 