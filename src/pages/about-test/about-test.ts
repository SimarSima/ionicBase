import { Detail2Page } from './../detail2/detail2';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AboutTestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about-test',
  templateUrl: 'about-test.html',
})
export class AboutTestPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutTestPage');
  }
  goToNext() { 
    this.navCtrl.push(Detail2Page);
  }

}
