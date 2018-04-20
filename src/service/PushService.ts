import Rx, { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import * as global from "../common/AgentConstans";
import { FCM } from "@ionic-native/fcm";
declare let cordova: any;

@Injectable()
export class PushService {
  constructor(private FCMPlugin: FCM) {}
  start(name: string): Observable<any> {
    let thisService = this;
    let observable;
    if (name == global.BaiduPush) {
      observable = Rx.Observable.create(function(observe) {
        cordova.plugins.BaiduPushCordovaPlugin.startWork(
          function(res) {
            console.info(res);
            observe.next(res);
          },
          function(error) {
            observe.error(error);
          }
        );
      });
      return observable;
    } else if (name == global.FCM) {
      observable = Rx.Observable.fromPromise(
        thisService.FCMPlugin.getToken()
      ).concat(thisService.FCMPlugin.onTokenRefresh());
      return observable;
    }
  }
  onMessage(name: string): Observable<any> {
    let thisService = this;
    if (name == global.FCM) {
      return thisService.FCMPlugin.onNotification();
    }
  }
  RxTest(): Observable<any> {
    let observable = Rx.Observable.fromPromise(
      new Promise(function(resolve, reject) {
        resolve("Promise resolve");
      })
    ).concat(
      Rx.Observable.create(function(observe) {
        setInterval(function() {
          observe.next(new Date() + "RX");
        }, 1000);
      })
    );
    return observable;
  }
}
