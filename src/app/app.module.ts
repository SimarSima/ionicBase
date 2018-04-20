import { Http, HttpModule } from '@angular/http';
import { AboutTestPage } from './../pages/about-test/about-test';
import { SoapTaskProxyService } from './../service/SoapTaskProxyService';
import { PushService } from "./../service/PushService";
import { BaseUtil } from "./../service/base/BaseUtil";
import { Device } from "@ionic-native/device";
import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";
import { AboutPage } from "../pages/about/about";
import { ContactPage } from "../pages/contact/contact";
import { HomePage } from "../pages/home/home";
import { TabsPage } from "../pages/tabs/tabs";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { FileTransfer } from "@ionic-native/file-transfer";
import { File } from "@ionic-native/file";
import { SWMSService } from "../service/SWMSService";
import { BaseFileService } from "../service/base/BaseFileService";
import { AutoUpgradeService } from "./../service/AutoUpgradeService";
import { ProgressBarComponent } from "../components/progress-bar/progress-bar";
import { FCM } from '@ionic-native/fcm';
import { NgxSoapModule } from 'ngx-soap';

@NgModule({
  declarations: [
    AboutTestPage,
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ProgressBarComponent
  ],
  imports: [HttpModule,NgxSoapModule,BrowserModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, AboutPage, ContactPage, HomePage, TabsPage,AboutTestPage],
  providers: [
    BaseUtil,
    AutoUpgradeService,
    BaseFileService,
    SWMSService,
    PushService,
    SoapTaskProxyService,
    Device,
    File,
    FileTransfer,
    StatusBar,
    SplashScreen,
    FCM,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
