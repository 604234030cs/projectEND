import { text } from '@angular/core/src/render3/instructions';
import { SettingStatusreceivePage } from './../setting-statusreceive/setting-statusreceive';
import { TeacherPage } from './../teacher/teacher';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import * as Enums from '../enums/enums';
import { HttpClient } from '@angular/common/http';
import { Validators, FormBuilder, FormGroup,FormControl } from '@angular/forms';
/**
 * Generated class for the CheckreceivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkreceive',
  templateUrl: 'checkreceive.html',
})
export class CheckreceivePage {


  user:FormGroup;
  item3: any = [];
  item4: any = [];
  checkname:any = [];
  updatecheckname:any = [];

  ck_statuss = "1";

  ck_date;
  idclass;

  st_id;
  checkdate;
  par_user;
  ck_receive;
  ck_other;
  i=0;
  text;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient, public alertCtrl: AlertController,
              public formBuilder: FormBuilder)

  {

    this.idclass = this.navParams.get('class_id');
    this.ck_date = this.navParams.get('ckdate');
    // this.ck_date = this.navParams.get('ckdate');

    this.loaddatareceive();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckreceivePage');



    // let url6 = Enums.APIURL.URL + '/todoslim3/public/index.php/checkaddsettingstudent4/'+this.ck_date+'&&'+this.idclass+'&&'+this.ck_statuss ;

    // this.http.get(url6).subscribe(data => {
    //   this.item3 = data;
    //   console.log(this.item3);
    //   // console.log(url6);

    // });
  }

  loaddatareceive(){

    let url6 = Enums.APIURL.URL + '/todoslim3/public/index.php/checkaddsettingstudent4/'+this.ck_date+'&&'+this.idclass+'&&'+this.ck_statuss ;

    this.http.get(url6).subscribe(data => {
      this.item3 = data;
      // console.log(this.item3);
      console.log(url6);
      if(this.item3['ck_receive'] == '1'){
        this.text = "ยังไม่ถูกรับ"
      }else if(this.item3['ck_receive']){
        this.text = "รับกลับไปแล้ว"
      }

    });

    // let url7 = Enums.APIURL.URL + '/todoslim3/public/index.php/ckstandckdate/'+this.item3.st_id+'&&'+this.item3.ck_date+'&&'+this.item3.par_user ;

    // this.http.get(url6).subscribe(data2 => {
    //   this.item4 = data2;
    //   // console.log(this.item3);
    //   console.log(url7);

    // });


  }

  gohome(){
    this.navCtrl.push(TeacherPage)
  }

  settingreceive(stid,ckreceive,ckother){

    console.log(stid);
    console.log(ckreceive);
    console.log(ckother);

    let url8 = Enums.APIURL.URL +'/todoslim3/public/index.php/checkaddsettingstudent2/'+stid+'&&'+this.ck_date;
    this.http.get(url8).subscribe((data:any)=>{
      console.log(data);

      if(data['st_id']==stid && data['ck_date']==this.ck_date && ckother == false ){
        console.log("1");

        ckother = "ไม่มี";
        let url9 = Enums.APIURL.URL +'/todoslim3/public/index.php/settingstudent2/'+stid+'&&'+data.student_name
        +'&&'+data.student_sname+'&&'+data.student_nickname+'&&'+data.Student_sex+'&&'+data.class_id
        +'&&'+data.par_user+'&&'+this.ck_date+'&&'+data.ck_status+'&&'+ckreceive+'&&'+ckother;
                   this.http.get(url9).subscribe((data2:any)=>{
                    console.log(url9);
        this.updatecheckname = data2;

       });




      }else if(data['st_id']==stid && data['ck_date']==this.ck_date){
        console.log("2");
        console.log(data.student_name);
        console.log(data.student_sname);



        let url9 = Enums.APIURL.URL +'/todoslim3/public/index.php/settingstudent2/'+stid+'&&'+data.student_name
        +'&&'+data.student_sname+'&&'+data.student_nickname+'&&'+data.Student_sex+'&&'+data.class_id
        +'&&'+data.par_user+'&&'+this.ck_date+'&&'+data.ck_status+'&&'+ckreceive+'&&'+ckother;
                   this.http.get(url9).subscribe((data2:any)=>{
                    console.log(url9);
        this.updatecheckname = data2;

       });

      }
    })




  }
  ngOnInit(){
    this.buildForm();
  }
  buildForm(): void{
    this.user = new FormGroup({
      ck_receive: new FormControl("",Validators.required),
      ck_other: new FormControl("",Validators.required)


    });
  }

  distance(stid,pruser){
    this.navCtrl.push(SettingStatusreceivePage,{
        st_id:stid,
        par_user:pruser
    })

  }




}
