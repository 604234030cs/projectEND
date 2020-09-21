import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as Enums from '../enums/enums';
import { HttpClient} from '@angular/common/http';

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

  testList: any = [
    {testID: 1, testName: " test1", checked: false},
    {testID: 2, testName: " test2", checked: false},
    {testID: 3, testName: "dgdfgd", checked: false},
    {testID: 4, testName: "UricAcid", checked: false}
 ]
 setting2: any=[]
 selectedArray :any = [];
 checked = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Test2Page');
  }

  loaddata2(){
    let url = Enums.APIURL.URL +'/todoslim3/public/index.php/check';
    this.http.get(url).subscribe(data=>{
      this.setting2 = data;
      console.log(this.setting2);
      // console.log(this.setting[0].class_id);
      // this.st_id = this.setting[0].st_id;
      // this.student_name = this.setting[0].student_name;
      // this.student_sname = this.setting[0].student_sname;
      // this.student_nickname = this.setting[0].student_nickname;
      // this.Student_sex = this.setting[0].Student_sex;
      // this.class_id = this.setting[0].class_id;



    })
  }


  checkAll(){
    for(let i =0; i <= this.testList.length; i++) {
      this.testList[i].checked = true;
    }
   console.log(this.testList);
  }

  selectMember(data){
   if (data.checked == true) {
      this.selectedArray.push(data);
    } else {
     let newArray = this.selectedArray.filter(function(el) {
       return el.testID !== data.testID;
    });
     this.selectedArray = newArray;
   }
   console.log(this.selectedArray);
  }



// //Adds the checkedbox to the array and check if you unchecked it
// addCheckbox(event, checkbox : String) {
//     if ( event.target.checked ) {
//       this.checked.push(checkbox);
//     } else {
//       let index = this.removeCheckedFromArray(checkbox);
//       this.checked.splice(index,1);
//     }
//   }

//   //Removes checkbox from array when you uncheck it
//   removeCheckedFromArray(checkbox : String) {
//     return this.checked.findIndex((category)=>{
//       return category === checkbox;
//     })
//   }

//   //Empties array with checkedboxes
//   emptyCheckedArray() {
//     this.checked = [];
//   }

//  getCheckedBoxes() {
//    //Do whatever
//    console.log(this.checked);
//  }

addCheckbox(event, checkbox : String) {
  if ( event.checked ) {
    this.checked.push(checkbox);
  } else {
    let index = this.removeCheckedFromArray(checkbox);
    this.checked.splice(index,1);
  }
}

//Removes checkbox from array when you uncheck it
removeCheckedFromArray(checkbox : String) {
  return this.checked.findIndex((category)=>{
    return category === checkbox;
  })
}

//Empties array with checkedboxes
emptyCheckedArray() {
  this.checked = [];
}

getCheckedBoxes() {
 //Do whatever
 console.log(this.checked);
}


}
