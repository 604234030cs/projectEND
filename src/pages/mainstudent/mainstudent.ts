import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpClient} from '@angular/common/http';
import { StudentDetailPage } from '../student-detail/student-detail';

import { AddclassPage } from '../addclass/addclass';
import { ClassPage } from '../class/class';
import * as Enums from '../enums/enums';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient) {
    this.loaddataclass();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MainstudentPage');


  }

  loaddataclass(){
    let url = Enums.APIURL.URL +'/todoslim3/public/index.php/allclass';
    this.http.get(url).subscribe(data=>{
      this.dataclass = data;
      console.log(data);

    })
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

}
