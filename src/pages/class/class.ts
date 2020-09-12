import { EditstudentPage } from './../editstudent/editstudent';
import { TestaddstudentPage } from './../testaddstudent/testaddstudent';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';
import { AddparentPage } from '../addparent/addparent';
import { HttpClient} from '@angular/common/http';
import { MainstudentPage } from '../mainstudent/mainstudent';
import * as Enums from '../enums/enums';
/**
 * Generated class for the ClassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-class',
  templateUrl: 'class.html',
})
export class ClassPage {


  parentandstudent:any=[];
  dataclass: any=[];
  idclass;
  nameclass:string='';
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient,
              public alertCtrl:AlertController,public loadingCtrl: LoadingController) {

    // this.loaddata();

    this.idclass = this.navParams.get('clsss_id');
    this.nameclass = this.navParams.get('class_name');
    console.log(this.idclass);



  }

  ionViewDidLoad() {
    this.loaddata();
    // console.log('ionViewDidLoad ClassPage');
    // console.log(this.idclass);

    // this.dataclass = this.navParams.data;
    // console.log(this.dataclass);

    // console.log( this.nameclass);
  }

  loaddata(){
    let url = Enums.APIURL.URL +'/todoslim3/public/index.php/parentandstudent/'+this.idclass;
    this.http.get(url).subscribe(data=>{
      this.parentandstudent = data;
      console.log(this.parentandstudent);

    })
  }


  ionViewWillEnter() {

    // this.dataclass = this.navParams.data;
    // console.log(this.dataclass);



  }
  addparent(idcl,namecl){
    this.navCtrl.push(AddparentPage,{
      clsss_id:idcl,
      class_name:namecl
    });
  }
  deletestandpar(paruser){
      let url = Enums.APIURL.URL +'/todoslim3/public/index.php/deletest/'+paruser;
      this.http.get(url).subscribe(deletest=>{
        this.parentandstudent = deletest;

        if(deletest != false){

          let url1 = Enums.APIURL.URL +'/todoslim3/public/index.php/deletepar/'+paruser;
          this.http.get(url1).subscribe(deletepar=>{
          this.parentandstudent = deletepar;
          })
          const loadder = this.loadingCtrl.create({
            content: "pleas wait.....",
            duration: 200,

          })
          loadder.present();

        }else{

        }
      })
      const confirm = this.alertCtrl.create({
        title: 'ต้องการลบข้อมูลหรือไม่?',
        buttons:[{
          text: 'ตกลง',
          handler: () =>{
            this.navCtrl.push(MainstudentPage);
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
  test(idcl,namecl){
    this.navCtrl.push(TestaddstudentPage,{
      clsss_id:idcl,
      class_name:namecl
    });
  }
  editstandpar(idclass,userpar){
    this.navCtrl.push(EditstudentPage,{
      class_id:idclass,
      par_user:userpar
    });
  }



}
