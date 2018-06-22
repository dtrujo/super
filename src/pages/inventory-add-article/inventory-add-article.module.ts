import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventoryAddArticlePage } from './inventory-add-article';

@NgModule({
  declarations: [
    InventoryAddArticlePage,
  ],
  imports: [
    IonicPageModule.forChild(InventoryAddArticlePage),
  ],
})
export class InventoryAddArticlePageModule {}
