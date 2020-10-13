import { MainstudentPage } from './../mainstudent/mainstudent';
// import { text } from '@angular/core/src/render3/instructions';
import { SettingStatusreceivePage } from './../setting-statusreceive/setting-statusreceive';
import { TeacherPage } from './../teacher/teacher';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import * as Enums from '../enums/enums';
import { HttpClient } from '@angular/common/http';
import { Validators, FormBuilder, FormGroup,FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';

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
  arry:any=[];

  edit: boolean = false;

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

  accout:any=[];
  teacher:any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient, public alertCtrl: AlertController,
              public formBuilder: FormBuilder,private storage: Storage)

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
      this.arry=[];
      // console.log(this.item3);
      console.log(data);
      if(this.item3['ck_receive'] == '1'){
        this.text = "ยังไม่ถูกรับ"

      }else if(this.item3['ck_receive'] == '2'){
        this.text = "รับกลับไปแล้ว"
      }
      this.CaculatDirections(this.item3);

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


  poppage(){
    this.navCtrl.push(MainstudentPage);
  }

  settingreceive(ckid,ckreceive,ckother){

    console.log(ckid);
    console.log(ckreceive);
    console.log(ckother);

    let url8 = Enums.APIURL.URL +'/todoslim3/public/index.php/checkaddsettingstudent2/'+ckid+'&&'+this.ck_date;
    this.http.get(url8).subscribe((data:any)=>{
      console.log(data);

      if(data['ck_id']==ckid && data['ck_date']==this.ck_date && ckother == false ){
        console.log("1");

        ckother = "ไม่มี";
        let url9 = Enums.APIURL.URL +'/todoslim3/public/index.php/settingstudent2/'+ckid+'&&'+data.st_id+'&&'+data.student_title+'&&'+data.student_name
        +'&&'+data.student_sname+'&&'+data.student_nickname+'&&'+data.Student_sex+'&&'+data.class_id
        +'&&'+data.par_user+'&&'+this.ck_date+'&&'+data.ck_status+'&&'+ckreceive+'&&'+ckother;
                   this.http.get(url9).subscribe((data2:any)=>{
                    console.log(url9);
        this.updatecheckname = data2;

       });




      }else if(data['ck_id']==ckid && data['ck_date']==this.ck_date){
        console.log("2");
        console.log(data.student_name);
        console.log(data.student_sname);


        let url9 = Enums.APIURL.URL +'/todoslim3/public/index.php/settingstudent2/'+ckid+'&&'+data.st_id+'&&'+data.student_name
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




  // ข้าม ทดลองโค้ดเอก
  CaculatDirections(item3){
    this.storage.get('accoutuser').then((position)=>{
      console.log(item3.length);
      console.log(position);



       for(let i =0;i<item3.length;i++){
       //     // console.log(item3[i].longitude);
          //  var R = 6373; // km
           var lat1 = position.teacher_latitude * Math.PI/180; //1
          //  console.log("1");

           var lng1 = position.teacher_longitude;  //2
          //  console.log("2");

           var lat2= item3[i].latitude * Math.PI/180;
           var lng2 = item3[i].longitude;
          //  var dLat = (lat2 - lat1) * Math.PI/180;
           var dLon = (lng2 - lng1) * Math.PI/180;
           // var a = Math.pow(Math.sin(dLat/2),2) + Math.pow(Math.sin(dLon/2),2)* Math.cos(lat1) * Math.cos(lat2);
           var a = Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(dLon);
           console.log(a);

           if (a > 1) {
               a = 1;
             }
               a = Math.acos(a);
               a = a * 180/Math.PI;
               a = a * 60 * 1.1515;
              var valuedirec = a * 1.609344
              var directions = valuedirec.toFixed(1);
           // var c =  2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));s
           // var d = R  * c;
           // console.log("1ระยะทางได้ผลลัพธ์ = " + valuedirec);
            this.arry.push({
              ck_id:item3[i]['ck_id'],
              st_id:item3[i]['st_id'],
              student_name:item3[i]['student_name'],
              student_sname:item3[i]['student_sname'],
              student_nickname:item3[i]['student_nickname'],
              Student_sex:item3[i]['Student_sex'],
              class_id:item3[i]['class_id'],
              par_user:item3[i]['par_user'],
              ck_date:item3[i]['ck_date'],
              ck_status:item3[i]['ck_status'],
              ck_receive:item3[i]['ck_receive'],
              ck_other:item3[i]['ck_other'],
               latitude:item3[i]['latitude'],
               longitude:item3[i]['longitude'],
               directions:directions + ' ' +'กม.',
               valuedirec:valuedirec
             });

       }

       // console.log(this.arry);
       let temp;
       let j:number;
       let k:number;
       // console.log(this.arry.length);
         for( k=0; k < this.arry.length-1; k++){
           // console.log(k);

             for( j = 0 ; j < this.arry.length-1; j++){
               // console.log(j);
               let index = j + 1;
               // console.log(this.arry[index]['valuedirec']);

                if(this.arry[j]['valuedirec'] > this.arry[j+1]['valuedirec']){
                 temp =this.arry[j];
                 this.arry[j]=this.arry[j+1];
              this.arry[j+1]=temp;
             }

             // console.log(this.arry[j]['directionscaculat']);

        }
     }
     console.log('หลังเรียง');
     console.log(this.arry);
    });
 }


 mode(){
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







}
