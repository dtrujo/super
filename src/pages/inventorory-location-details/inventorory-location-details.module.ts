import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventororyLocationDetailsPage } from './inventorory-location-details';

@NgModule({
  declarations: [
    InventororyLocationDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(InventororyLocationDetailsPage),
  ],
})
export class InventororyLocationDetailsPageModule {}
