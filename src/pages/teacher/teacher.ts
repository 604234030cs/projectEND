import { AllchecknamePage } from './../allcheckname/allcheckname';
import { AllrarentPage } from './../allrarent/allrarent';
import { Test2Page } from './../test2/test2';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { MainteacherPage } from '../mainteacher/mainteacher';


import { HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { MainstudentPage } from '../mainstudent/mainstudent';
import * as Enums from '../enums/enums';
//import { text } from '@angular/core/src/render3/instructions';

/**
 * Generated class for the TeacherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teacher',
  templateUrl: 'teacher.html',
})
export class TeacherPage {

  accout: any= [];
  teacher: any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public http: HttpClient,private storage: Storage, public alertCtrl: AlertController,)
              {
                this.loaddata();
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherPage');

  }
  mainteacher(){
    this.navCtrl.push(MainteacherPage);
  }

  toteacher(){
    this.navCtrl.push(MainstudentPage);
  }

  test(){
    this.navCtrl.push(Test2Page)
  }


  loaddata(){

      this.storage.get('accoutuser').then((data)=>{
        this.accout = data;
        console.log(data);
        let url = Enums.APIURL.URL +'/todoslim3/public/index.php/teacherall/user='+this.accout.tuser+'&&'+'pass='+this.accout.tpassword;
        this.http.get(url).subscribe(user =>{
        this.accout = user;
        console.log(user);

      });
      })

  }
  logout(){
    const confirm = this.alertCtrl.create({
      title: 'คุณต้องการออกจากระบบหรือไม่',
      buttons:[{
          text: 'ตกลง',
          handler: () =>{
            this.storage.remove('accoutuser');
            this.navCtrl.setRoot(HomePage);
          }
        },
          {
            text: 'ยกเลิก',
            handler: () =>{}
          }
      ]
    });
    confirm.present();




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
