import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';

import 'rxjs/add/operator/map';
import { Validators, FormBuilder, FormGroup,FormControl } from '@angular/forms';
import { HomePage } from '../home/home';

import { Geolocation } from '@ionic-native/geolocation';
import * as Enums from '../enums/enums';
/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {
   user:FormGroup;
   sex:  any=['นางสาว','นาง','นาย'];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public formBuilder: FormBuilder,public http: HttpClient,
              public alertCtrl:AlertController,public loadingCtrl:LoadingController,
              private geolocation: Geolocation)
              {



              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
  }

  Register(){
    console.log(this.user.value);
    console.log(this.user.valid);
    if(this.user.value.teacher_user != ""&&this.user.value.teacher_name != "" &&this.user.value.teacher_sname){
      let url = Enums.APIURL.URL +'/todoslim3/public/index.php/register';
      let url2 = Enums.APIURL.URL +'/todoslim3/public/index.php/checkuser/'+this.user.value.teacher_user;

      this.http.get(url2).subscribe((err:any)=>{
        if(err['teacher_user'] == this.user.value.teacher_user){
          const alert = this.alertCtrl.create({
            title: 'เกิดข้อผิดพลาด',
            subTitle: 'user ได้ถูกใช้ไปแล้ว',
            buttons: ['OK']
          });
          alert.present();
        }else if(err['teacher_user'] != this.user.value.teacher_user){
          let setdata = JSON.stringify({
                teacher_user: this.user.value.teacher_user,
                teacher_password: this.user.value.teacher_password,
                teacher_title: this.user.value.teacher_title,
                teacher_name: this.user.value.teacher_name,
                teacher_sname: this.user.value.teacher_sname,
                teacher_address: this.user.value.teacher_address,
                teacher_tel: this.user.value.teacher_tel,
                teacher_latitude: this.user.value.teacher_latitude,
                teacher_longitude: this.user.value.teacher_longitude

          });
          let datapost = JSON.parse(setdata);
          const confirm = this.alertCtrl.create({
            title: 'ยืนยันการสมัคร',
            message: 'กดปุ่มยืนยันเพื่อลงทะเบียนเข้าสู่ระบบ',
            buttons:[
              {
                text: 'ยืนยัน',
                handler: () =>{
                  this.geolocation.getCurrentPosition().then((resp) => {
                     resp.coords.latitude
                     resp.coords.longitude
                    this.http.post(url,datapost).subscribe((status:any)=>{
                      console.log(status);

                      if(status.status != null){
                        const alert = this.alertCtrl.create({
                          title: 'สำเร็จ',
                          subTitle: 'ลงทะเบียนเรียบร้อย',
                          buttons: [{
                            text: 'ตกลง',
                            handler: ()=>{
                              const loader = this.loadingCtrl.create({
                                content: "Pleas wait...",
                                duration: 500,

                              });
                              loader.present();

                            }
                          }]
                        });
                        alert.present();
                      }

                    });
                   }).catch((error) => {
                     console.log('Error getting location', error);
                   });

                  this.navCtrl.push(HomePage);
                }
              },
              {
                text: 'ยกเลิก',
                handler: ()=>{
                }
              }
            ]
          });
          confirm.present();
        }
      });
    }else{
      const alert = this.alertCtrl.create({
        title: 'เกิดข้อผิดดพลาด',
        subTitle: 'กรุณาใส่ข้อมูล',
        buttons: ['ตกลง']
      });
      alert.present();
    }
  }

  ngOnInit(){
    this.buildForm();
  }
  buildForm(): void{
    this.user = new FormGroup({
      teacher_user: new FormControl("",Validators.required),
      teacher_password: new FormControl("",Validators.required),
      teacher_title: new FormControl("",Validators.required),
      teacher_name: new FormControl("",Validators.required),
      teacher_sname: new FormControl("",Validators.required),
      teacher_address: new FormControl("",Validators.required),
      teacher_tel: new FormControl("",Validators.required),

    });
  }

}

