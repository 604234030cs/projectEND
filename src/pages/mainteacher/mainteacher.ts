import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import * as Enums from '../enums/enums';
import { Geolocation } from '@ionic-native/geolocation';

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
  latitude;
  longitude;
  edit: boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,
                    private storage: Storage,public http: HttpClient, public alertCtrl:AlertController,private geolocation: Geolocation)
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

  updatecoordinates(){
    console.log("22");


    this.storage.get('accoutuser').then((data)=>{
      this.accout = data;
      console.log(data);
      let url = Enums.APIURL.URL +'/todoslim3/public/index.php/teacherall/user='+this.accout.teacher_user+'&&'+'pass='+this.accout.teacher_password;
      this.http.get(url).subscribe(user =>{
      this.teacher = user;
      console.log(user);



      if(user != null ){
        console.log("3");


        const confirm = this.alertCtrl.create({
          title: 'อัพเดตพิกัดที่อยู่',
          subTitle: 'กดปุ่มยืนยันเพื่ออัพเดต',
          buttons:[
            {
            text: 'ยืนยัน',
            handler: ()=>{
              this.geolocation.getCurrentPosition().then((resp) => {
                resp.coords.latitude
                resp.coords.longitude
                this.latitude = resp.coords.latitude;
                this.longitude = resp.coords.longitude;
                let url = Enums.APIURL.URL + '/todoslim3/public/index.php/editteacherlatlong/' + this.teacher.teacher_id + '&&' + this.latitude + '&&' + this.longitude;
                this.http.get(url).subscribe((data3:any)=>{
                  console.log(data3);
                  if(data3.status != null){
                    const alert = this.alertCtrl.create({
                      title: 'สำเร็จ',
                      subTitle: 'อัพเดตพิกัดเรียบร้อย',
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
              })

              this.dorefres();
            }
          },
          {
            text: 'ยกเลิก',
            handler:()=>{

            }
          }
        ]
        });
        confirm.present();
      }else{

      }


     })
    })






  }
  dorefres(){
    setTimeout(()=>{
    this.ionViewWillLoad();
  },500)
}



}
