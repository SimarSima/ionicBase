import { Http, HttpModule } from '@angular/http';
import { AboutTestPage } from './../pages/about-test/about-test';
import { SoapTaskProxyService } from './../service/SoapTaskProxyService';
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
import { NgxSoapModule } from 'ngx-soap';
import { BackgroundMode } from '@ionic-native/background-mode';
import { BackgroundServiceProvider } from '../providers/background-service/background-service';
import { DatabaseServiceProvider } from '../providers/database-service/database-service';
import { SQLite } from '@ionic-native/sqlite';
import { ModuleTwoPage } from '../pages/module-two/module-two';

@NgModule({
  declarations: [
    AboutTestPage,
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ProgressBarComponent,
    ModuleTwoPage
  ],
  imports: [HttpModule,NgxSoapModule,BrowserModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, AboutPage, ContactPage, HomePage, TabsPage,AboutTestPage,ModuleTwoPage],
  providers: [
    BackgroundMode,
    BaseUtil,
    AutoUpgradeService,
    BaseFileService,
    SWMSService,
    SoapTaskProxyService,
    Device,
    File,
    FileTransfer,
    StatusBar,
    SplashScreen,
    SQLite,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    BackgroundServiceProvider,
    DatabaseServiceProvider
  ]
})
export class AppModule {}
