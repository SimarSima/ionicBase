import { Injectable } from '@angular/core';
import { BackgroundMode } from '@ionic-native/background-mode';

/*
  Generated class for the BackgroundServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BackgroundServiceProvider {

  constructor(private backgroundMode: BackgroundMode) {
    console.log('Hello BackgroundServiceProvider Provider');
  }

  start(){
    this.backgroundMode.enable();
    this.backgroundMode.on('enable').subscribe(function(){
      console.info("start back ground ");
      setInterval(function(){
        console.info("Service on");
      },3000);
      
    });
  }

  stopService(){
    this.backgroundMode.disable();
    this.backgroundMode.on('disable').subscribe(function(){
      console.info("stop back ground ");
    });
  }

  onService(){
    this.backgroundMode.on('activate').subscribe(function(){
      console.info("back ground going");
    });
  } 

}
