import { Detail2Page } from './../detail2/detail2';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutTestPage } from './about-test';

@NgModule({
  declarations: [
    AboutTestPage,
    Detail2Page
  ],
  entryComponents: [AboutTestPage, Detail2Page],
  imports: [
    IonicPageModule.forChild(AboutTestPage),
  ],
})
export class AboutTestPageModule { }
