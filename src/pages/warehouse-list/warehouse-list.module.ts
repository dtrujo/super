import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WarehouseListPage } from './warehouse-list';

@NgModule({
  declarations: [
    WarehouseListPage,
  ],
  imports: [
    IonicPageModule.forChild(WarehouseListPage),
  ],
})
export class WarehouseListPageModule {}
