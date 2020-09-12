import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import * as Enums from '../enums/enums';
/**
 * Generated class for the RegisterPage page.d
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public user:FormGroup;
  sex:  any=['เด็กชาย','เด็กหญิง','นางสาว','นาง','นาย'];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public http: HttpClient,public formBuilder: FormBuilder
            ) {
              this.user = this.formBuilder.group({
                tuser: ['', Validators.required],
                tpassword: ['', Validators.required],
                title: ['', Validators.required],
                tname: ['', Validators.required],
                tlassname: ['', Validators.required],
                tage: ['', Validators.required],
                taddress: ['', Validators.required],
                tphone: ['',Validators.required]
              });

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  doLogin(){

    console.log(this.user.value);
    console.log(this.user.valid);



    let url = Enums.APIURL.URL +'/todoslim3/public/index.php/register';
    let postdataset = JSON.stringify({
      tuser:  this.user.value.tuser,
      tpassword:  this.user.value.tpassword,
      title:  this.user.value.title,
      tname:  this.user.value.tname,
      tlassname:  this.user.value.tlassname,
      tage:  this.user.value.tage,
      taddress:  this.user.value.taddress,
      tphone:  this.user.value.tphone

    });
    console.log(postdataset);

    let postdata = JSON.parse(postdataset);
    this.http.post(url,postdata)
    .subscribe(call=>{
        console.log(call);

    //if(call != null){
    //  alert("Input Success");
    //  this.navCtrl.push("HomePage");
    //}else{
    //  alert("Input Fail")
    //}
    })
  }

}
