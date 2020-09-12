import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import * as Enums from '../enums/enums';
/**
 * Generated class for the EditstudentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editstudent',
  templateUrl: 'editstudent.html',
})
export class EditstudentPage {

  acount: any = ['st_id','student_name','student_sname','student_nickname','Student_sex','class_id',
                 'par_user','par_id','par_password','par_name','par_sname','par_tel','latitude','longitude',
  ];
  classid:any;
  paruser:any;
  editstudent: boolean=false;
  editparent: boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,
              public http: HttpClient, public alertCtrl:AlertController)

  {

    this.classid = this.navParams.get('class_id');
    this.paruser = this.navParams.get('par_user');
    this.loaddata();
    // console.log(this.acount);

  }

  ionViewWillLoad() {
    // console.log('ionViewDidLoad EditstudentPage');
    // console.log(this.classid);
    // console.log(this.paruser);
    // this.loaddata();


  }

  loaddata(){

    let url2 =  Enums.APIURL.URL +'/todoslim3/public/index.php/standparedit/'+this.classid+'&&'+this.paruser;
    this.http.get(url2).subscribe(user =>{
      this.acount = user;
      console.log(this.acount[0].student_name);
    })
  }
  ionViewDidLeave(){
    this.editstudent=false
    this.editparent=false
    this.dorefres();

  }

  editAccountstudent(){
    let url =  Enums.APIURL.URL +'/todoslim3/public/index.php/editteacher/'+this.acount[0].st_id+'&&'+this.acount[0].student_name+'&&'+this.acount[0].student_sname
               +'&&'+this.acount[0].student_nickname+'&&'+this.acount[0].Student_sex+'&&'+this.acount[0].class_id+'&&'+this.acount[0].par_user;

      this.http.get(url).subscribe(data=>{
      this.acount[0] = data;
      console.log(url);

      if(data != false){
        const alert = this.alertCtrl.create({
          title: 'ยืนยันการแก้ไขมูล',
          buttons: [{
            text: 'ตกลง',
            handler: ()=>{
              this.editstudent=false

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
  editAccountparent(){


  }
  dorefres(){
    setTimeout(()=>{
    this.ionViewWillLoad();
  },500)
}


}
