import { BaseFileService } from "./base/BaseFileService";
import { Injectable } from "@angular/core";
import { Device } from "@ionic-native/device";
import { LoadingController } from "ionic-angular";
import * as AgentConstans from "../common/AgentConstans";
declare let cordova: any;

@Injectable()
export class SWMSService {
  constructor(
    private baseBaseFileService: BaseFileService,
    private device: Device,
    private loadingCtrl: LoadingController
  ) {}

  downloadFile(
    source: string,
    path: string,
    file: string,
    Opt: any
  ): Promise<any> {
    var thisService = this;
    let targetPath: string =
      cordova.file.externalRootDirectory + "/" + path + file;
    let loadingDialog = this.loadingCtrl.create(
      AgentConstans.loadingDialogConfig
    );
    targetPath = targetPath.replace(/file:\/\//, "");
    let promise = new Promise(function(resolve, reject) {
      loadingDialog.present();
      thisService.baseBaseFileService
        .checkAndCreateDir(cordova.file.externalRootDirectory, path)
        .then(function() {
          console.info("2");
          return thisService.baseBaseFileService.downloadFile(
            source,
            targetPath,
            Opt
          );
        })
        .then(function() {
          if (thisService.device.platform == "Android") {
            console.info(targetPath);
            cordova.plugins.androidShowPDFPlugin.showPDF(
              targetPath,
              function() {
                return Promise.resolve();
              },
              function(error) {
                return Promise.reject(error);
              }
            );
          } else {
          }
        })
        .then(function() {
          resolve("success");
          loadingDialog.dismiss();
        })
        .catch(function(error) {
          console.error(error);
          reject(error);
          loadingDialog.dismiss();
        });
    });
    return promise;
  }
}
