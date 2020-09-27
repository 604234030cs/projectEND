import { TeacherPage } from './../teacher/teacher';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import * as Enums from '../enums/enums';
import { HttpClient } from '@angular/common/http';
/**
 * Generated class for the CheckreceivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkreceive',
  templateUrl: 'checkreceive.html',
})
export class CheckreceivePage {

  item3: any = [];

  ck_statuss = "1";

  ck_date;
  idclass;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient, public alertCtrl: AlertController)

  {

    this.idclass = this.navParams.get('class_id');
    this.ck_date = this.navParams.get('ckdate');

    this.loaddatareceive();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckreceivePage');



    // let url6 = Enums.APIURL.URL + '/todoslim3/public/index.php/checkaddsettingstudent4/'+this.ck_date+'&&'+this.idclass+'&&'+this.ck_statuss ;

    // this.http.get(url6).subscribe(data => {
    //   this.item3 = data;
    //   console.log(this.item3);
    //   // console.log(url6);

    // });
  }

  loaddatareceive(){

    let url6 = Enums.APIURL.URL + '/todoslim3/public/index.php/checkaddsettingstudent4/'+this.ck_date+'&&'+this.idclass+'&&'+this.ck_statuss ;

    this.http.get(url6).subscribe(data => {
      this.item3 = data;
      console.log(this.item3);
      // console.log(url6);

    });


  }

  gohome(){
    this.navCtrl.push(TeacherPage)
  }

}
