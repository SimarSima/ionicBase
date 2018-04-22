import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModuleTwoPage } from './module-two';

@NgModule({
  declarations: [
    ModuleTwoPage,
  ],
  imports: [
    IonicPageModule.forChild(ModuleTwoPage),
  ],
})
export class ModuleTwoPageModule {}
