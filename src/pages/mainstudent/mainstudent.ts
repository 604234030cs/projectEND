import { AllchecknamePage } from './../allcheckname/allcheckname';
import { EditclassPage } from './../editclass/editclass';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { HttpClient} from '@angular/common/http';
import { StudentDetailPage } from '../student-detail/student-detail';

import { AddclassPage } from '../addclass/addclass';
import { ClassPage } from '../class/class';
import * as Enums from '../enums/enums';
import { TeacherPage } from '../teacher/teacher';
import { AllrarentPage } from '../allrarent/allrarent';
// import { I18NHtmlParser } from '@angular/compiler';


/**
 * Generated class for the MainstudentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mainstudent',
  templateUrl: 'mainstudent.html',
})
export class MainstudentPage {

  datastudent: any=[];
  dataclass: any=[];
  name: any=['อาราวี','เอกรักษ์'];
  class;

  class_id;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient
    ,public alertCtrl:AlertController,public loadingCtrl:LoadingController) {
    this.loaddataclass();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MainstudentPage');


  }

  loaddataclass(){
    let url = Enums.APIURL.URL +'/todoslim3/public/index.php/class';
    this.http.get(url).subscribe(data=>{
      this.dataclass = data;
      console.log(data);

    })
  }
  editclass(class_id){
    this.navCtrl.push(EditclassPage,{
      class_id:class_id
    })
    // let url = Enums.APIURL.URL +'/todoslim3/public/index.php/classid/'+class_id;
    // this.http.get(url).subscribe((data:any)=>
    // {
    //   console.log(data);

    // })

  }

  deleteclass(class_id){
    const confirm = this.alertCtrl.create({
      title: 'ต้องการลบข้อมูลหรือไม่?',
      buttons:[{
        text: 'ตกลง',
        handler: () =>{
          let url = Enums.APIURL.URL +'/todoslim3/public/index.php/deleteclass/'+class_id;
          this.http.get(url).subscribe(data=>{
            this.class = data;
            console.log(this.class);
          })

          this.navCtrl.push(MainstudentPage);
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





  detail(student){
    this.navCtrl.push(StudentDetailPage,student);
  }

  refrese(){
    setInterval(()=>{
      this.ionViewDidLoad();
    },500)
    }

    classroom(){
      this.navCtrl.push(AddclassPage)
    }

    // classdata(class_id,class_name){
    //   console.log(this.dataclass.class_id);
    //   console.log(this.dataclass.class_name);

    //   this.navCtrl.push(ClassPage,class_id,class_name)
    // }

   goClass(id,name){
    //  console.log(id);
    //  console.log(name);

      this.navCtrl.push(ClassPage,{
        clsss_id:id,
        class_name:name
      });
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
