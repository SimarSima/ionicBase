import { Injectable } from "@angular/core";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from "@ionic-native/file-transfer";
import { File } from "@ionic-native/file";
import Rx, { Observable } from "rxjs/Rx";
declare let cordova: any;

@Injectable()
export class BaseFileService {
  constructor(private transfer: FileTransfer, private file: File) {}
  createDir(basePath, folderName, overwriteFlg) {
    this.file
      .createDir(basePath, folderName, overwriteFlg)
      .then(function(result: any) {}, function(error: any) {});
  }

  getFullFilePath(basePath: string, folderPath: string) {
    let tempBath = basePath + "";
    let fullPath = "";
    if (tempBath.substr(-1) == "/") {
      tempBath = tempBath.substr(0, tempBath.length - 1);
    }
    if (folderPath.substr(-1) == "/") {
      folderPath = folderPath.substr(0, folderPath.length - 1);
    }
    if (folderPath.substr(0, 1) == "/") {
      folderPath = folderPath.substr(1, folderPath.length - 1);
    }
    fullPath = tempBath + "/" + folderPath + "/";
    return fullPath;
  }

  createDirTaskPromiseFun(basePath, folderName, overwriteFlg) {
    return this.file.createDir(basePath, folderName, overwriteFlg);
  }

  checkAndCreateDir(path: string, dirName: string): Promise<any> {
    var thisService = this;
    let promise = new Promise(function(resolve, reject) {
      thisService.file
        .checkDir(path, dirName)
        .then(
          function() {
            resolve();
          },
          function(error) {
            if (error.code == 1) {
              return thisService.file.createDir(path, dirName, true);
            } else {
              reject(error);
            }
          }
        )
        .then(function() {
          resolve();
        });
    });
    return promise;
  }

  downloadFile(source: string, target: string, Opt: any): Promise<any> {
    const fileTransfer: FileTransferObject = this.transfer.create();
    let promise = new Promise(function(resolve, reject) {
      fileTransfer
        .download(source, target, true, Opt)
        .then(function(res) {
          console.info("Download File");
          console.info(res);
          resolve(res);
        })
        .catch(function(error) {
          console.error(error);
          reject(error);
        });
    });
    return promise;
  }
  downloadFileWithProgress(
    source: string,
    target: string,
    Opt: any
  ): Observable<any> {
    let fileTransfer: FileTransferObject = new FileTransferObject();
    let observable = Rx.Observable.create(function(observer) {
      fileTransfer.onProgress(function(event) {
        if (event.lengthComputable) {
          try {
            console.info("Base");
            console.info(event);
            observer.next(event);
          } catch (error) {
            observer.error(error);
          }
        }
      });
      fileTransfer
        .download(source, target, Opt)
        .then(function(res) {
          console.info("down load then");
          console.info(res);
          observer.complete();
        })
        .catch(function(error: any) {
          observer.error(error);
        });
    });
    return observable;
  }
  private b64toBlob(b64Data, contentType) {
    contentType = contentType || "";
    let sliceSize = 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
  saveBase64AsImageFile(
    folderpath,
    filename,
    content,
    contentType
  ): Promise<any> {
    let dataBlob = this.b64toBlob(content, contentType);
    console.log("Starting to write the file :3");
    folderpath = cordova.file.externalRootDirectory + "/" + folderpath;
    return this.file.writeFile(folderpath, filename, dataBlob, {replace:true});
  }
}
