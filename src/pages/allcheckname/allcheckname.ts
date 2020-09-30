import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';
import { AllrarentPage } from '../allrarent/allrarent';
import { TeacherPage } from '../teacher/teacher';
import * as Enums from '../enums/enums';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the AllchecknamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-allcheckname',
  templateUrl: 'allcheckname.html',
})
export class AllchecknamePage {

  alllistcheckdate:any=['check_id','check_data'];
  listchecknameformdate:any=[];

  ck_date;
  text;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient,
    public alertCtrl:AlertController,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllchecknamePage');
    let url = Enums.APIURL.URL +'/todoslim3/public/index.php/allcheckdate';
    this.http.get(url).subscribe((data:any)=>{
      this.alllistcheckdate = data;
      console.log(this.alllistcheckdate);

    })


  }

  listcheckname(ck_date){
    console.log(ck_date);
    let url2 = Enums.APIURL.URL +'/todoslim3/public/index.php/checknamefromdate/'+ck_date;
    this.http.get(url2).subscribe((data2:any)=>{
      this.listchecknameformdate = data2;
      if(this.listchecknameformdate['ck_receive'] == '1'){
        this.text = "ยังไม่ถูกรับ"
      }else if(this.listchecknameformdate['ck_receive']){
        this.text = "รับกลับไปแล้ว"
      }
    })



  }

  editcheckname(){

  }
  deletecheckname(){

  }
  settingreceive(){

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
