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
  ck_date:any;
  update:any=[];
  stutus3:any=['ck_id','st_id','student_name','student_sname','student_nickname','Student_sex','class_id',
  'par_user','ck_date','ck_status','ck_receive','ck_other','par_tel','latitude','longitude',
];


  editstudent: boolean=false;
  editparent: boolean=false;
  editstatus: boolean=false;
  ck_status: boolean ;


  ck_receive;
  ck_other;

  settingdate;

  monthNames: string[];
  nbDate: number;
  nbMonth: number;
  stMonth: string;
  nbYear: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,
              public http: HttpClient, public alertCtrl:AlertController)

  {

    let date = new Date();


    this.monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    this.nbDate = date.getDate();
    this.nbMonth = date.getMonth() + 1;
    this.stMonth = this.monthNames[date.getMonth()];
    this.nbYear = date.getFullYear();

    this.classid = this.navParams.get('class_id')
    this.paruser = this.navParams.get('par_user');
    this.ck_date = this.navParams.get('ckdate');


    console.log(this.stutus3.ck_status);


    this.loaddata();
    this.loaddata3();
    // console.log(this.acount);

  }

  ionViewWillLoad() {
    // console.log('ionViewDidLoad EditstudentPage');
    // console.log(this.classid);
    // console.log(this.paruser);
     this.loaddata();
     this.loaddata3();


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
    this.editstatus=false
    this.dorefres();

  }
  status(){

  }

  loaddata3(){
    let url2 = Enums.APIURL.URL +'/todoslim3/public/index.php/checkdate2/'+this.ck_date;
    this.http.get(url2).subscribe(data=>{
      this.settingdate = data;
      console.log(this.settingdate);


    })
  }
  loaddata4(){
    let url2 = Enums.APIURL.URL +'/todoslim3/public/index.php/allcheckstudentname2/';
    this.http.get(url2).subscribe(data=>{
      this.stutus3 = data;
      console.log(this.stutus3);


    })
  }

  statusstudy(id,s,d){
    // console.log(id);
    // console.log(s);
    // console.log(d);
    // console.log(this.settingdate.check_id);
    if(id != "" && d != ""){
      let url =  Enums.APIURL.URL +'/todoslim3/public/index.php/addsettingstudent2';
      let url5 = Enums.APIURL.URL +'/todoslim3/public/index.php/checkaddsettingstudent2/'+id+'&&'+d;

      this.http.get(url5).subscribe((data:any)=>{
        console.log([data]);


        if(data['st_id']==id && data['ck_date']==d){
          // console.log("1");

              let url = Enums.APIURL.URL +'/todoslim3/public/index.php/settingstudent2/'+data.st_id+'&&'+data.student_name
            +'&&'+data.student_sname+'&&'+data.student_nickname+'&&'+data.Student_sex+'&&'+data.class_id
            +'&&'+data.par_user+'&&'+d+'&&'+s+'&&'+data.ck_receive+'&&'+data.ck_other;
                       this.http.get(url).subscribe((data2:any)=>{
            this.update = data2;
            // console.log(this.update);
           });
        }else if(data['st_id']!=id && data['ck_date']!=d){   //data== false
          let receive = "false";
          let other = "false";
          console.log(this.acount);
          console.log(this.acount[0].student_name);
          console.log(this.acount[0].st_id);

              console.log(s);
              console.log(d);

          let setdata2 = JSON.stringify({
            st_id: this.acount[0].st_id,
            student_name: this.acount[0].student_name,
            student_sname: this.acount[0].student_sname,
            student_nickname: this.acount[0].student_nickname,
            Student_sex: this.acount[0].Student_sex,
            class_id: this.acount[0].class_id,
            par_user: this.acount[0].par_user,
            ck_date: d,
            ck_status: s,
            ck_receive:receive,
            ck_other: other


          })
          let datapost = JSON.parse(setdata2);
          this.http.post(url,datapost).subscribe((status:any)=>{
            console.log(status);
          });
          this.dorefres();

        }else if(data['st_id']==id && data['ck_date']!=d){   //data== false
          let receive = "false";
          let other = "false";
          console.log(this.acount);
          console.log(this.acount[0].student_name);
          console.log(this.acount[0].st_id);
          console.log(this.acount[0].ck_receive);

              console.log(s);
              console.log(d);

          let setdata2 = JSON.stringify({
            st_id: this.acount[0].st_id,
            student_name: this.acount[0].student_name,
            student_sname: this.acount[0].student_sname,
            student_nickname: this.acount[0].student_nickname,
            Student_sex: this.acount[0].Student_sex,
            class_id: this.acount[0].class_id,
            par_user: this.acount[0].par_user,
            ck_date: d,
            ck_status: s,
            ck_receive:receive,
            ck_other: other


          })
          let datapost = JSON.parse(setdata2);
          this.http.post(url,datapost).subscribe((status:any)=>{
            console.log(status);
          });
          this.dorefres();

        }
      });
    }




  }





  editAccountstudent(){
    let url =  Enums.APIURL.URL +'/todoslim3/public/index.php/editstudent2/'+this.acount[0].st_id+'&&'+this.acount[0].student_name+'&&'+this.acount[0].student_sname
               +'&&'+this.acount[0].student_nickname+'&&'+this.acount[0].Student_sex;

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
      let url =  Enums.APIURL.URL +'/todoslim3/public/index.php/editparent2/'+this.acount[0].par_id+'&&'+this.acount[0].par_user+'&&'+this.acount[0].par_name
               +'&&'+this.acount[0].par_sname+'&&'+this.acount[0].par_tel;

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
  dorefres(){
    setTimeout(()=>{
    this.ionViewWillLoad();
  },500)
}


}
