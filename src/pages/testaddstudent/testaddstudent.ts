import { MainstudentPage } from './../mainstudent/mainstudent';
import { AddparentPage } from './../addparent/addparent';
import { ClassPage } from './../class/class';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController,ModalController,ViewController} from 'ionic-angular';
import { Validators, FormBuilder, FormGroup,FormControl } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import * as Enums from '../enums/enums';

/**
 * Generated class for the TestaddstudentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-testaddstudent',
  templateUrl: 'testaddstudent.html',
})
export class TestaddstudentPage {
  gaming: string = "n64";
  gender: string = "f";
  os: string;
  parent:any =[];
  month: string;
  year: number;



  user:FormGroup;
  classid;
  nameclass:string='';

  alert: { title: string, subTitle: string };

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public http: HttpClient,public formBuilder: FormBuilder,
              public alertCtrl:AlertController,public loadingCtrl:LoadingController,
              private modal: ModalController)
              {
                this.dorefres();
                // this.loaddata();
                this.classid = this.navParams.get('clsss_id');
                this.nameclass = this.navParams.get('class_name');
                this.alert = {
                  title: 'ผู้ปกครอง',
                  subTitle: 'เลือกรายชื่อผู้ปกครอง'
                };

                // this.loaddata();

              }


ionViewWillEnter() {
    console.log('ionViewWillEnter TestaddstudentPage');
    let url2 = Enums.APIURL.URL +'/todoslim3/public/index.php/allparent';
    this.http.get(url2).subscribe(dataparent=>{
      this.parent = dataparent;
      console.log(dataparent);

    })
    // this.loaddata();
    // this.dorefres();

  }

  // loaddata(){
  //   let url2 = Enums.APIURL.URL +'/todoslim3/public/index.php/allparent';
  //   this.http.get(url2).subscribe(dataparent=>{
  //     this.parent = dataparent;
  //     console.log(dataparent);

  //   })
  // }



  addparent(){
    const myModal = this.modal.create(AddparentPage);
    // this.navCtrl.push(AddparentPage);
    myModal.present();

  }

  stpSelect() {
    console.log('STP selected');
  }
  addstudent(){
    console.log(this.user.value);
    console.log(this.user.valid);
    // if(this.user.value.class_name != ""){
      let url = Enums.APIURL.URL +'/todoslim3/public/index.php/addstudent2';


      // this.http.get(url2).subscribe((err:any)=>{
      //   if(err['class_name'] == this.user.value.class_name){
      //     const alert = this.alertCtrl.create({
      //       title: 'เกิดข้อผิดพลาด',
      //       subTitle: 'ชื่อชั้นนี้ ได้ถูกใช้ไปแล้ว',
      //       buttons: ['OK']
      //     });
      //     alert.present();
      //   }else if(err['class_name'] != this.user.value.class_name){
          let setdata = JSON.stringify({
                student_title: this.user.value.student_title,
                student_name: this.user.value.student_name,
                student_sname: this.user.value.student_sname,
                student_nickname: this.user.value.student_nickname,
                Student_sex: this.user.value.Student_sex,
                class_id: this.classid,
                par_user: this.user.value.par_user


          });
          let datapost = JSON.parse(setdata);
          const confirm = this.alertCtrl.create({
            title: 'ยืนยันเพิ่มนักเรียน',
            message: 'กดปุ่มยืนยันเพื่อเพิ่มนักเรียน',
            buttons:[
              {
                text: 'ยืนยัน',
                handler: () =>{

                    this.http.post(url,datapost).subscribe((status:any)=>{
                      console.log(status);

                      if(status.status != null){
                        const alert = this.alertCtrl.create({
                          title: 'สำเร็จ',
                          subTitle: 'เพิ่มนักเรียนเสร็จเสร็จ',
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


                  this.navCtrl.setRoot(MainstudentPage);
                }
              },
              {
                text: 'ยกเลิก',
                handler: ()=>{
                  // this.navCtrl.setRoot(MainstudentPage)
                }
              }
            ]
          });
          confirm.present();
        }


  ngOnInit(){
    this.buildForm();
  }
  buildForm(): void{
    this.user = new FormGroup({
      student_title: new FormControl("",Validators.required),
      student_name: new FormControl("",Validators.required),
      student_sname: new FormControl("",Validators.required),
      student_nickname: new FormControl("",Validators.required),
      Student_sex: new FormControl("",Validators.required),
      // class_id: new FormControl("",Validators.required),
       par_user: new FormControl("",Validators.required)

    });
  }

  dorefres(){
    setTimeout(()=>{
    this.ionViewWillEnter();
  },500)
}

}
