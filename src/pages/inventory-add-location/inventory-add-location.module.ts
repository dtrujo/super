import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventoryAddLocationPage } from './inventory-add-location';

@NgModule({
  declarations: [
    InventoryAddLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(InventoryAddLocationPage),
  ],
})
export class InventoryAddLocationPageModule {}
