import { MainstudentPage } from './../mainstudent/mainstudent';
import { TeacherPage } from './../teacher/teacher';
import { ClassPage } from './../class/class';
// import { text } from '@angular/core/src/render3/instructions';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,LoadingController } from 'ionic-angular';
import * as Enums from '../enums/enums';
import { HttpClient } from '@angular/common/http';




/**
 * Generated class for the Test2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test2',
  templateUrl: 'test2.html',
})
export class Test2Page {

  parentandstudent: any = [];
  item3: any = [{

    st_id: null,
    status: null,

  }];
  ck_date;

  selectedArray: any = [];
  checked = [];
  idclass;
  i = 0;
  c_length = 0;
  c_success = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public alertCtrl: AlertController,public loadingCtrl:LoadingController) {

    this.idclass = this.navParams.get('class_id');
    this.ck_date = this.navParams.get('ckdate');
    console.log(this.idclass);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Test2Page');



    let url = Enums.APIURL.URL + '/todoslim3/public/index.php/parentandstudent/'+this.idclass;
    this.http.get(url).subscribe(data => {
      this.item3 = data;
      console.log(this.item3);

    })
  }


  check(res) {
    this.presentAlerRadio(res)
  }
  presentAlerRadio(res) {
    this.i = 0;
    const alert = this.alertCtrl.create({
      title: 'Status',
      inputs: [
        // {
        //   name: 'come_study',
        //   type: 'radio',
        //   label: 'มาเรียน',
        //   value: 'มาเรียน'
        // },
        {
          name: 'sick_leve',
          type: 'radio',
          label: 'ลาป่วย',
          value: '2'
        },
        {
          name: 'errand_leve',
          type: 'radio',
          label: 'ลากิจ',
          value: '3'
        },
        {
          name: 'Not_come to study',
          type: 'radio',
          label: 'ไม่มาเรียน',
          value: '4'
        },
      ],
      buttons: [
        {
          text: 'Cencel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'OK',
          handler: (value) => {
            for (let i = 0; i < this.item3.length; i++) {
              if (this.item3[this.i].st_id == res.st_id) {
                this.item3[this.i].status = value;
              }
              this.i++;
            };
            console.log('Confirm Ok', this.item3);

          }
        }
      ]
    });
    alert.present();
  }

  ISNERT_CHECK(data,ckdate) {

    // if(ckdate != ""){
    //   let url =  Enums.APIURL.URL + '/todoslim3/public/index.php/adddate2';
    //   let url2 = Enums.APIURL.URL +'/todoslim3/public/index.php/checkdate2/'+ckdate;
    //   this.http.get(url2).subscribe((err:any)=>{

    //   })

    // }


    let url3 =  Enums.APIURL.URL + '/todoslim3/public/index.php/adddate2';
    let url5 = Enums.APIURL.URL +'/todoslim3/public/index.php/checkdate2/'+ckdate;
    this.http.get(url5).subscribe((checkdate:any)=>{



    this.c_length = data.length;
    this.c_success = 0;
    // console.log('data',data);
    // console.log(ckdate);
    let i;
    let setdata2;


    if(checkdate['check_data'] == ckdate){

      const alert = this.alertCtrl.create({
        title: 'แจ้งเตือน',
        subTitle: 'ได้ทำการเช็คชื่อวันนี้ไปแล้ว',
        buttons: [
          {
          text: 'ตกลง',
          handler: ()=>{
            this.navCtrl.push(MainstudentPage)
          }

        }
      ]


      })
      alert.present();

    }else{

      let setdata = JSON.stringify({
        check_data: ckdate


      });
      let datapost = JSON.parse(setdata);
      this.http.post(url3,datapost).subscribe((datadate:any)=>{
        console.log(datadate);
      });


    for (i = 0; i < data.length; i++) {



       if(data[i].status == undefined) {
        console.log('1');

        setdata2 = JSON.stringify({
          st_id: data[i].st_id,
          ck_date: ckdate,
          ck_status: "1",
          ck_receive: "1",
          ck_other: "ไม่มี"
        });

        let datapost = JSON.parse(setdata2);
        let url = Enums.APIURL.URL + '/todoslim3/public/index.php/addsettingstudent2';

        this.http.post(url,datapost).subscribe((data: any) => {
          console.log('data', data);




          // if(data != "have" && this.c_success == this.c_length){}
        });



      } else {
        console.log('2');
        setdata2 = JSON.stringify({
          st_id: data[i].st_id,
          ck_date: ckdate,
          ck_status: data[i].status,
          ck_receive: "1",
          ck_other: "ไม่มี"
        });

        let datapost = JSON.parse(setdata2);
        let url = Enums.APIURL.URL + '/todoslim3/public/index.php/addsettingstudent2';
        this.http.post(url,datapost).subscribe((status: any) => {
          console.log('status', status);




          this.navCtrl.push(ClassPage)

          // if(data != "have" && this.c_success == this.c_length){}
        });
      }
      console.log(setdata2);





      // }

    }
    const alert = this.alertCtrl.create({
      title: 'สำเร็จ',
      subTitle: 'บันทึกการเช็คชื่อเรียบร้อย',
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
    this.navCtrl.push(MainstudentPage)
      }

    });

  }


  gohome(){
    this.navCtrl.push(TeacherPage)
  }

  poppage(){
    this.navCtrl.push(MainstudentPage);
  }




}
