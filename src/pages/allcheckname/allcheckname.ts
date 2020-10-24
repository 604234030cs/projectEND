import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';
import { AllrarentPage } from '../allrarent/allrarent';
import { TeacherPage } from '../teacher/teacher';
import * as Enums from '../enums/enums';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

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
  alllistclass:any=[];
  listchecknameformdate:any=[];
  updatecheckname:any=[];
  deletechecknamefromdata:any=[];

  ck_date;
  class_id;
  receive;
  status;
  // title;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient,
    public alertCtrl:AlertController,public loadingCtrl: LoadingController,private storage: Storage) {

      // this.dorefres()
      this.loaddata();
      this.loaddataclass();

  }


  ionViewWillEnter() {
    console.log('ionViewDidLoad AllchecknamePage');


  }

  loaddata(){
    let url = Enums.APIURL.URL +'/todoslim3/public/index.php/allcheckdate';
    this.http.get(url).subscribe((data:any)=>{
      this.alllistcheckdate = data;
      console.log(this.alllistcheckdate);
    });
  }
  loaddataclass(){
    let url2 = Enums.APIURL.URL +'/todoslim3/public/index.php/allcheckclass';
    this.http.get(url2).subscribe((data:any)=>{
      this.alllistclass = data;
      console.log(this.alllistclass);
    });
  }
  setkey(ck_date,class_id){

    let key = {
      ck_date:ck_date,
      class_id:class_id
    }
    this.storage.set('keylistcheckname',key);
    this.listcheckname();
  }


  listcheckname(){
    this.storage.get('keylistcheckname').then((data:any)=>{
      console.log(data);



    let url2 = Enums.APIURL.URL +'/todoslim3/public/index.php/checknamefromdate/'+data.ck_date+'&&'+data.class_id;
    this.http.get(url2).subscribe((data2:any)=>{
      this.listchecknameformdate = data2;
      if(this.listchecknameformdate['ck_receive'] == '1'){
        this.receive = "ยังไม่ถูกรับ"
        if(this.listchecknameformdate['ck_status'] == '1'){
          this.status = "มาเรียน"
        }else if(this.listchecknameformdate['ck_status'] == '2'){
          this.status = "ลาป่วย"
        }else if(this.listchecknameformdate['ck_status'] == '3'){
          this.status = "ลากิจ"
        }else if(this.listchecknameformdate['ck_status'] == '4'){
          this.status = "ไม่มาเรียน"
        }
      }else if(this.listchecknameformdate['ck_receive']){
        this.receive = "รับกลับไปแล้ว"
        if(this.listchecknameformdate['ck_status'] == '1'){
          this.status = "มาเรียน"
        }else if(this.listchecknameformdate['ck_status'] == '2'){
          this.status = "ลาป่วย"
        }else if(this.listchecknameformdate['ck_status'] == '3'){
          this.status = "ลากิจ"
        }else if(this.listchecknameformdate['ck_status'] == '4'){
          this.status = "ไม่มาเรียน"
        }
      }
      console.log(data2);

    });
  })



  }

  settingreceive(ckid,ckstatus,ckreceive,ckother){

    console.log(ckid);
    console.log(ckstatus);
    console.log(ckreceive);
    console.log(ckother);

    let url8 = Enums.APIURL.URL +'/todoslim3/public/index.php/checkaddsettingstudent2/'+ckid+'&&'+this.ck_date;
    this.http.get(url8).subscribe((data:any)=>{
      console.log(data);
      if(data['ck_id']==ckid && data['ck_date']==this.ck_date){
        console.log("2");
        // console.log(data.student_name);
        // console.log(data.student_sname);



        let url9 = Enums.APIURL.URL +'/todoslim3/public/index.php/settingstudent2/'+ckid+'&&'+data.st_id+'&&'+data.ck_date+'&&'+ckstatus+'&&'+ckreceive+'&&'+ckother;
                   this.http.get(url9).subscribe((data2:any)=>{
                    console.log(url9);
        this.updatecheckname = data2;
        if(this.updatecheckname != null){
          const alert = this.alertCtrl.create({
            title: 'เสร็จสิน',
            subTitle: 'อัพเดคสถานะการรับสำเร็จ',
            buttons: [{
              text: 'ตกลง',
              handler: ()=>{
                const loader = this.loadingCtrl.create({
                  content: "Pleas wait...",
                  duration: 200,

                });
                loader.present();

              }
            }]
          });
          alert.present();
        }

       });

      }
      else{

      }
    })




  }

  deletecleckname(ckid){
    const confirm = this.alertCtrl.create({
      title: 'ต้องการลบข้อมูลหรือไม่?',
      buttons:[{
        text: 'ตกลง',
        handler: () =>{
          let url = Enums.APIURL.URL +'/todoslim3/public/index.php/deletecheckname/'+ckid;
          this.http.get(url).subscribe(data=>{
            this.deletechecknamefromdata = data;
            console.log(this.deletechecknamefromdata);
          })

          this.navCtrl.push(AllchecknamePage);
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

//   dorefres(){
//     setTimeout(()=>{
//     this.ionViewWillEnter();
//   },500)
// }


gohome(){
  this.navCtrl.push(TeacherPage);
}
goparent(){
  this.navCtrl.push(AllrarentPage);
}
// goallcheckname(){
//   this.navCtrl.push(AllchecknamePage);
// }

}
