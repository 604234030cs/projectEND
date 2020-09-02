import { Component, } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { TeacherPage } from '../teacher/teacher';
import { Storage } from '@ionic/storage';
import { TestPage } from '../test/test';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //inputlogin:any={};
  public login:FormGroup;
  
  


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public formBuilder: FormBuilder,public http: HttpClient,
              public loadingCtrl: LoadingController, public alertCtrl: AlertController,
              private storage: Storage
              ) {
              
                //this.login.value.tuser="";
                //this.login.value.tpassword="";
                
              this.login = this.formBuilder.group({
                tuser: ['', Validators.required],
                tpassword: ['',Validators.required]
              });
              
              
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewWillEnter(){
    this.storage.get('accoutuser').then((val) => {
      if(val != null){
        const loader = this.loadingCtrl.create({
          content: "Please wait........",
          duration: 500,
        });
        this.navCtrl.setRoot(TeacherPage,val);
        loader.present();
      }else{
         // this.navCtrl.setRoot(HomePage);
      }

      console.log('Your age is', val);
    });

  }
  
   
  // ฟังก์ชั่นส่งค่าเมื่อ submit ฟอร์ม
  doLogin(){
    console.log(this.login.value);
    console.log(this.login.valid);
  }  
  register(){

    this.navCtrl.push(TestPage);
  }
  logincheck(tuser,tpassword){

      

    
      console.log("tuser", this.login.value.tuser);
      console.log("tpassword", this.login.value.tpassword);
      let url ='http://localhost/todoslim3/public/index.php/login/user='+this.login.value.tuser+'&&'+'pass='+this.login.value.tpassword;
      this.http.get(url).subscribe((data:any={})=>{


        let account = {
          tid:data['tid'],
          tuser:data['tuser'],
          tpassword:data['tpassword']
        }
        if(data != "false"){
          console.log(data);
          const loader = this.loadingCtrl.create({
            content: "Pleas  wait.....",
            duration: 500,
          });
          loader.present();
          this.storage.set('accoutuser',account);
          this.navCtrl.setRoot(TeacherPage,tuser,tpassword);
        //  this.storage.ready().then(()=>{
        //  this.storage.set('accoutuser',account)
        //});
          
        }else if(data == "false"){
         let alert = this.alertCtrl.create({
           message: "รหัสผู้ใช้ หรือ พาสเวิร์ด ไม่ถูกต้อง",
           buttons: [
             {
              cssClass: 'secondary',
              text: 'Ok',
              role: 'OK'
             }
           ]
         });
         alert.present();
         this.login.value.tuser = "";
         this.login.value.tpassword = "";
        }
      
      });
    }

    

  }


  


