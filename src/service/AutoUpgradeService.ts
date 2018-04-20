import Rx, { Observable } from "rxjs/Rx";
import { BaseFileService } from "./base/BaseFileService";
import { Injectable } from "@angular/core";
declare let cordova: any;

@Injectable()
export class AutoUpgradeService {
  constructor(private baseFileService: BaseFileService) {}

  download(
    source: string,
    path: string,
    file: string,
    Opt: any
  ): Observable<any> {
    let thisService = this;
    let target = cordova.file.externalRootDirectory + "/" + path + "/" + file;
    // let observable = Rx.Observable.fromPromise(
    //   thisService.baseFileService.checkAndCreateDir(
    //     cordova.file.externalRootDirectory,
    //     path
    //   )
    // );
    let observable = Rx.Observable.fromPromise(
      thisService.baseFileService.checkAndCreateDir(
        cordova.file.externalRootDirectory,
        path
      )
    )
      .concat(
        thisService.baseFileService.downloadFileWithProgress(
          source,
          target,
          null
        )
      )
      .filter(function(res) {
        return res != null;
      });
    // let observable=Rx.Observable.fromPromise(thisService.)
    return observable;
    // thisService.baseFileService
    //   .checkAndCreateDir(cordova.file.externalRootDirectory, path)
    //   .then(function() {
    //     return thisService.baseFileService.downloadFileWithProgress(
    //       source,
    //       target,
    //       Opt
    //     );
    //   });

    // let observable = Rx.Observable.create(function(observer) {
    //   thisService.baseFileService
    //     .checkAndCreateDir(cordova.file.externalRootDirectory, path)
    //     .then(function() {
    //       thisService.baseFileService
    //         .downloadFileWithProgress(source, target, Opt)
    //         .subscribe(
    //           function(event) {
    //             observer.next(event);
    //           },
    //           function(error) {
    //             console.error(error);
    //             observer.error(error);
    //           },
    //           function() {
    //             //observer.complete();
    //           }
    //         );
    //     });
    // });
    // return observable;
  }
}
