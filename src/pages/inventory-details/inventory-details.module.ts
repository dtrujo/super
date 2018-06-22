import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventoryDetailsPage } from './inventory-details';

@NgModule({
  declarations: [
    InventoryDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(InventoryDetailsPage),
  ],
})
export class InventoryDetailsPageModule {}
