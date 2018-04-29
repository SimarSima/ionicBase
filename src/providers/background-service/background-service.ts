import Rx, { Observable, Subscription } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { BackgroundMode } from '@ionic-native/background-mode';

/*
  Generated class for the BackgroundServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BackgroundServiceProvider {
  private EVENT_ENAGBLE: string = "enable";
  private delayTime1 = 2000;
  private myArray: Array<string> = ["Test1", "Test2", "Test3"];
  private subscription: Subscription;

  constructor(private backgroundMode: BackgroundMode) {
    console.log('Hello BackgroundServiceProvider Provider');
  }

  start() {
    let thisObj = this;
    if (!this.backgroundMode.isActive()) {
      this.backgroundMode.enable();
    }
    this.subscription= Rx.Observable.merge(this.backgroundMode.on(this.EVENT_ENAGBLE), Rx.Observable.interval(thisObj.delayTime1),
      Rx.Observable.fromPromise(new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve(thisObj.myArray)
        }, 3000)
      })))
      .filter(value=>value!=undefined)
      .subscribe(function(res){
        if(typeof res==='number'){
          new Promise(function (resolve, rejectre) {
            setTimeout(function () {
              resolve("API Result");
            }, 1000);
          })
            .then((res) => {
              console.info(res);
            })
            .catch(function (err) {
              console.info(err)
            });
        }else {
          Rx.Observable.create(function(observer){
            observer.next();
          })
          
        }

      });

    //  this.subscription= Rx.Observable.interval(thisObj.delayTime1)
    //     .concat(this.backgroundMode.on(this.EVENT_ENAGBLE))
    //     .concat(Rx.Observable.fromPromise(new Promise(function(resolve,reject){
    //       setTimeout(function(){
    //         resolve(thisObj.myArray)
    //       },3000)
    //     })))
    //     .subscribe(function (res) {
    //       console.info(res);
    //       if(typeof res ==='string'){
    //         console.info("get the vale");
    //       }
    //       new Promise(function (resolve, rejectre) {
    //         setTimeout(function () {
    //           resolve("API Result");
    //         }, 1000);
    //       })
    //         .then((res) => {
    //           console.info(res);
    //         })
    //         .catch(function (err) {
    //           console.info(err)
    //         });
    //     });
  }

  stopService() {
    let thisObj = this;
    this.backgroundMode.disable();
    this.backgroundMode.on('disable').subscribe(function () {
      console.info("stop back ground ");
      thisObj.subscription.unsubscribe();
    });
  }

  onService() {
    this.backgroundMode.on('activate').subscribe(function () {
      console.info("back ground going");

    });
  }

}
