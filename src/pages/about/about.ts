import { AboutTestPage } from './../about-test/about-test';
import { SoapTaskProxyService } from './../../service/SoapTaskProxyService';
import { BaseFileService } from "./../../service/base/BaseFileService";
import { Component, AfterViewInit } from "@angular/core";
import { App, NavController, ViewController } from "ionic-angular";
import SignaturePad from "signature_pad";
declare let cordova: any;

@Component({
  selector: "page-about",
  templateUrl: "about.html"
})
export class AboutPage implements AfterViewInit {
  signaturePad: SignaturePad;
  signatureRes: string = "";
  loginRes: string = "";
  constructor(
    public navCtrl: NavController,
    private baseFileService: BaseFileService,
    private loginSoap: SoapTaskProxyService, public appCtrl: App, public viewCtrl: ViewController
  ) { }

  ngAfterViewInit() {
    let canvas = document.getElementById("my_signature");
    //this.signaturePad = new SignaturePad(canvas);
    //console.info(typeof SignaturePad());
    this.signaturePad = new SignaturePad(canvas);
  }

  saveSignature() {
    let dataURL = this.signaturePad.toDataURL();
    let thisPage = this;
    console.info(dataURL);
    if (dataURL != null) {
      let block: string[] = dataURL.split(";");
      let contentType: string = block[0].split(":")[1];
      let content: string = block[1].split(",")[1];
      thisPage.baseFileService
        .saveBase64AsImageFile("ionic_base", "test.png", content, contentType)
        .then(function (res) {
          let src = cordova.file.externalRootDirectory + "/ionic_base/test.png";
          console.info("Save Success");
          thisPage.signatureRes = src;
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }
  clearSinature() {
    this.signaturePad.clear();
    this.signatureRes = "";
  }
  login() {
    let thisPage = this;
    this.loginSoap.Login()
      .then(function (res) {
        console.info(res);
        thisPage.loginRes = JSON.stringify(res);
      });
  }
  goToNext() {
    // this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().push(AboutTestPage);
  }
  // function download(dataURL, filename) {
  //   var blob = dataURLToBlob(dataURL);
  //   var url = window.URL.createObjectURL(blob);

  //   var a = document.createElement("a");
  //   a.style = "display: none";
  //   a.href = url;
  //   a.download = filename;

  //   document.body.appendChild(a);
  //   a.click();

  //   window.URL.revokeObjectURL(url);
  // }
}
