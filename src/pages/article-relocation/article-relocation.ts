import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { Articles } from '../../providers/providers';
import { User } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-article-relocation',
  templateUrl: 'article-relocation.html',
})
export class ArticleRelocationPage {
  private articleForm : FormGroup;
  article : any;
  warehouse : any;
  success : any;

  /**
   * 
   * @param navCtrl 
   * @param formBuilder 
   * @param storage 
   * @param toastCtrl 
   * @param articlesServ 
   * @param user 
   * @param navParams 
   */
  constructor(
    public navCtrl: NavController, 
    private formBuilder: FormBuilder,
    private storage: Storage,
    private events: Events,
    private toastCtrl: ToastController,
    public articlesServ: Articles,
    public user : User,
    public navParams: NavParams) {
   
    // get article
    this.article = navParams.get('article');

    // get warehpuse
    this.warehouse = navParams.get('warehouse');

    // is valid the article form
    this.articleForm = this.formBuilder.group({
      old_location: ['', Validators.required],
      new_location:['', Validators.required]
    });
  }

  /**
   * relocate specific article
   */
  reLocateArticle(){
    let location = '{"warehouse":"' + this.warehouse.id +'" , "location":"' + this.articleForm.value.new_location + '"}';
    
    this.articlesServ.reLocateArticle( this.article.article_id, location ).subscribe( data => {   
      let message = '';

      // control message 
      if (data['success'] == 1){
        this.events.publish('warehouse:changed', location);
        message = "The relocation was fun";
      }
      else {
        message = data['error'];
      } 
      
      this.presentToast( message );
    }); 
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
   */
  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticleRelocationPage');
  }
}
