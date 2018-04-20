import { PushService } from "./../../service/PushService";
import { BaseUtil } from "./../../service/base/BaseUtil";
import { AutoUpgradeService } from "./../../service/AutoUpgradeService";
import { SWMSService } from "./../../service/SWMSService";
import { Component, ChangeDetectorRef } from "@angular/core";
import { NavController } from "ionic-angular";
import * as Global from "../../common/AgentConstans";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  public progress: number = 0;
  public fcm_token: string = "EMPTY";
  public fcm_message: string;

  constructor(
    public navCtrl: NavController,
    private swmsService: SWMSService,
    private autoUpgradeService: AutoUpgradeService,
    private changeDetectorRef: ChangeDetectorRef,
    private baseUtil: BaseUtil,
    private pushService: PushService
  ) {}
  ionViewCanEnter() {
    console.info("ionViewCanEnter");
    console.info(navigator.userAgent);
    if (!this.baseUtil.isBroswer()) {
      this.pushService.start(Global.BaiduPush);
    }
  }
  ionViewWillEnter() {
    console.info("ionViewWillEnter");
    console.info(this.baseUtil.isBroswer());
  }
  ionViewDidLoad() {
    console.info("ionViewDidLoad");
  }

  ngOnInit() {
    //this.progress;
  }
  ngAfterViewInit() {}
  goToSWMS() {
    //console.info("START");
    this.swmsService
      .downloadFile(Global.pdfURL, "ionic_base", "test.pdf", null)
      .then(function(res) {
        console.info("Success");
        console.info(res);
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  upgrade() {
    let thisPage = this;
    this.progress = 0;
    this.autoUpgradeService
      .download(Global.apkURl, "ionic_base", "new.apk", null)
      .subscribe(function(event) {
        console.info("HOME");
        console.info(event);
        thisPage.progress = event.loaded / event.total * 100;
        thisPage.progress = Number(thisPage.progress.toFixed(2));
        console.info(thisPage.progress);
        thisPage.changeDetectorRef.markForCheck();
        thisPage.changeDetectorRef.detectChanges();
      });
  }
  startBaiduPush() {
    if (!this.baseUtil.isBroswer()) {
      console.info("start PUSH");
      this.pushService.start(Global.BaiduPush);
    } else {
      console.info("CANT");
    }
  }
  startGooglePush() {
    let thisPage = this;
    if (!this.baseUtil.isBroswer()) {
      console.info("start PUSH");
      this.pushService.start(Global.FCM).subscribe(function(res) {
        console.info(res);
        thisPage.fcm_token = res;
      });
      this.pushService.onMessage(Global.FCM).subscribe(function (res) {
        console.info(res);
        res = JSON.stringify(res);
        thisPage.fcm_message = res;
        alert(res);
      });
    } else {
      console.info("CANT");
    }
  }
  RxTest() {    
    var a = { k1: 1, K2: 2 };
    this.fcm_message = JSON.stringify(a);
    alert(a);
  }
}
