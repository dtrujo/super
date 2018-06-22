import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventoryAmountPage } from './inventory-amount';

@NgModule({
  declarations: [
    InventoryAmountPage,
  ],
  imports: [
    IonicPageModule.forChild(InventoryAmountPage),
  ],
})
export class InventoryAmountPageModule {}
