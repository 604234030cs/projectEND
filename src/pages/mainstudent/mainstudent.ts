import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StudentPage } from '../student/student';
import { HttpClient} from '@angular/common/http';
import { StudentDetailPage } from '../student-detail/student-detail';

/**
 * Generated class for the MainstudentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mainstudent',
  templateUrl: 'mainstudent.html',
})
export class MainstudentPage {
  
  datastudent: any=[];
  name: any=['อาราวี','เอกรักษ์'];

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainstudentPage');
    this.loadstudent();
    
  }
  
  student(){
    this.navCtrl.push(StudentPage)
  }
  loadstudent(){
    let url = "http://localhost/todoslim3/public/index.php/studentandparent"
    this.http.get(url).subscribe(data=>{
      this.datastudent =data;
      console.log(this.datastudent);
      
      
    })
  }
  detail(student){
    this.navCtrl.push(StudentDetailPage,student);
  }

  refrese(){
    setInterval(()=>{
      this.ionViewDidLoad();
    },500)
    }
  


}
