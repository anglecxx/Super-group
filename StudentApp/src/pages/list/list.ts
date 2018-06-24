import {Component} from '@angular/core';
import {LoadingController,NavController, NavParams} from 'ionic-angular';
import {GlobalStorage} from '../../providers/global-storage'
import {RedditData} from '../../providers/reddit-data'
import {KaoqinPage} from "../kaoqin/kaoqin";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  // selectedItem: any;
  // icons: string[];
  // items: Array<{title: string, note: string, icon: string}>;
  calltherolls: any;
  // backimg:string;
  // items:Array<{img:string, cn:any, cs:any, cd:any}>;

  constructor(public loadingCtrl: LoadingController,public absentData: RedditData, public globalStorage: GlobalStorage, public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    // this.selectedItem = navParams.get('t');

    // Let's populate this page with some filler content for funzies
    // this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    // 'american-football', 'boat', 'bluetooth', 'build'];
    //
    // this.items = [];
    // for (let i = 1; i < 11; i++) {
    //   this.items.push({
    //     title: '请假/旷课 ' + i,
    //     note: '事由' + i,
    //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //   });
    // }
// this.backimg = 'assets/img/background/background-' + [Math.floor(Math.random() * 4) + 1] + '.jpg';

    globalStorage.getStorage('stuId').then(res => {
      absentData.getCallTheRollByID(res).subscribe(result => {
        this.calltherolls = result.callTheRolls;
      })
    });
    // for(let c of this.calltherolls) {
    //   this.items.push({
    //     img:this.backimg,
    //     cn:c.courseName,
    //     cs:c.callstate,
    //     cd:c.calldate
    //   });
    // }

  }

  // itemTapped(event, item) {
  //   // That's right, we're pushing to ourselves!
  //   this.navCtrl.push(ListPage, {
  //     t: item
  //   });
  // }
  gotoKaoqin() {
    let loading = this.loadingCtrl.create({
      duration: 2500
    });
    loading.present();
    this.navCtrl.push(KaoqinPage);
  }
}
