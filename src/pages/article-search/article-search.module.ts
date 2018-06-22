import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticleSearchPage } from './article-search';

@NgModule({
  declarations: [
    ArticleSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(ArticleSearchPage),
  ],
})
export class ArticleSearchPageModule {}
