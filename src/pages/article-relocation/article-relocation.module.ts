import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticleRelocationPage } from './article-relocation';

@NgModule({
  declarations: [
    ArticleRelocationPage,
  ],
  imports: [
    IonicPageModule.forChild(ArticleRelocationPage),
  ],
})
export class ArticleRelocationPageModule {}
