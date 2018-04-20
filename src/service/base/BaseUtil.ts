import { Platform } from 'ionic-angular';
import { Injectable } from "@angular/core";

@Injectable()
export class BaseUtil{ 
    constructor(private plt:Platform) { }
    isBroswer() { 
        if (this.plt.is('core') || this.plt.is('mobileweb')) {
            return true;
        } else { 
            return false;
        }
    }
}