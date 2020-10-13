import { AllchecknamePage } from './../allcheckname/allcheckname';
import { EditparentPage } from './../editparent/editparent';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';
import * as Enums from '../enums/enums';
import { HttpClient } from '@angular/common/http';
import { TeacherPage } from '../teacher/teacher';
import { LoaddataProvider } from '../../providers/loaddata/loaddata';

/**
 * Generated class for the AllrarentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-allrarent',
  templateUrl: 'allrarent.html',
})
export class AllrarentPage {

  parent:any=[];
  datadeleteparent:any=[];
  par_id;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient,
    public alertCtrl:AlertController,public loadingCtrl: LoadingController,public parents:LoaddataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllrarentPage');

    let url = Enums.APIURL.URL +'/todoslim3/public/index.php/allparent';
    this.http.get(url).subscribe((data:any)=>{
      this.parent = data;
      console.log(data);

    })


  }
  ionViewWillLoad(){
    this.ionViewDidLoad();
  }

  editparent(par_id){
    this.navCtrl.push(EditparentPage,{
      par_id:par_id
    })

  }

  deleteparent(par_id){
    const confirm = this.alertCtrl.create({
      title: 'ต้องการลบข้อมูลหรือไม่?',
      buttons:[{
        text: 'ตกลง',
        handler: () =>{
          let url1 = Enums.APIURL.URL +'/todoslim3/public/index.php/deletepar/'+par_id;
          this.http.get(url1).subscribe(data=>{
            this.datadeleteparent = data;
            console.log(this.datadeleteparent);
          })

          this.dorefres();
        }

      },
      {
        text: 'ยกเลิก',
        handler: () => {}
      }

      ]

    });
    confirm.present();
  }

  getItems(ev: any){
    let val = ev.target.value;

    if (val !=0) {
      this.parents.searchrooms(val).subscribe(data=>{
        this.parent = data;
      });
    }else {
     this.ionViewWillLoad();
  }
  }

  dorefres(){
    setTimeout(()=>{
    this.ionViewWillLoad();
  },500)
}

gohome(){
  this.navCtrl.push(TeacherPage);
}
goparent(){
  this.navCtrl.push(AllrarentPage);
}
goallcheckname(){
  this.navCtrl.push(AllchecknamePage);
}


}
