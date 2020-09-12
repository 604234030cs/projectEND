import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import * as Enums from '../enums/enums';

/**
 * Generated class for the MainteacherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mainteacher',
  templateUrl: 'mainteacher.html',
})
export class MainteacherPage {

  accout: any= [];
  teacher: any=[];
  edit: boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,
                    private storage: Storage,public http: HttpClient, public alertCtrl:AlertController)
                    {
                      this.loaddata();
                    }

  ionViewWillLoad() {
    console.log('ionViewDidLoad MainteacherPage');
    this.loaddata();

  }
 //ionViewWillEnter(){

 //  this.storage.get('accoutuser').then(data=>{
 //    this.accout = data;
 //    console.log(data);
 //  })
 //  let url ='http://localhost/todoslim3/public/index.php/teacher/user='+this.accout.tuser+'&&'+'pass='+this.accout.tpassword;
 //  this.http.get(url).subscribe(user =>{
 //    this.teacher = user;
 //    console.log(user);
 //
 //  })

 //}
  loaddata(){

    this.storage.get('accoutuser').then((data)=>{
      this.accout = data;
      console.log(data);
      let url = Enums.APIURL.URL +'/todoslim3/public/index.php/teacherall/user='+this.accout.teacher_user+'&&'+'pass='+this.accout.teacher_password;
      this.http.get(url).subscribe(user =>{
      this.teacher = user;
      console.log(user);

     })
    })

}


  ionViewDidLeave(){
    this.edit=false
    this.dorefres();

  }


  editAccount(){

    let url = Enums.APIURL.URL +'/todoslim3/public/index.php/editteacher/'+this.teacher.teacher_id+'&&'+this.teacher.teacher_title+'&&'+this.teacher.teacher_name
               +'&&'+this.teacher.teacher_sname+'&&'+this.teacher.teacher_address+'&&'+this.teacher.teacher_tel;

      this.http.get(url).subscribe(data=>{
      this.accout = data;
      if(data != false){
        const alert = this.alertCtrl.create({
          title: 'ยืนยันการแก้ไขมูล',
          buttons: [{
            text: 'ตกลง',
            handler: ()=>{
              this.edit=false

                this.dorefres();
            }
          },
          {
            text: 'ยกเลิก',
            handler: () =>{}
          }
        ]
        })
        alert.present();
      }else{

        //
      }


    })

  }
  dorefres(){
    setTimeout(()=>{
    this.ionViewWillLoad();
  },500)
}


}
