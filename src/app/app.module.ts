import { EditparentPage } from './../pages/editparent/editparent';
import { AllrarentPage } from './../pages/allrarent/allrarent';
import { EditclassPage } from './../pages/editclass/editclass';
import { SettingStatusreceivePage } from './../pages/setting-statusreceive/setting-statusreceive';
import { CheckreceivePage } from './../pages/checkreceive/checkreceive';
// import { EditstatusPage } from './../pages/editstatus/editstatus';
import { EditstudentPage } from './../pages/editstudent/editstudent';
import { TestaddstudentPage } from './../pages/testaddstudent/testaddstudent';
import { BrowserModule } from '@angular/platform-browser';
import { enableProdMode, ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TeacherPage } from '../pages/teacher/teacher';
import { MainteacherPage } from '../pages/mainteacher/mainteacher';
import { StudentPage } from '../pages/student/student';

import { IonicStorageModule } from '@ionic/storage';
import { TestPage } from '../pages/test/test';
import { StudentDetailPage } from '../pages/student-detail/student-detail';
import { EditteacherPage } from '../pages/editteacher/editteacher';
import { Geolocation } from '@ionic-native/geolocation';
import { AddclassPage } from '../pages/addclass/addclass';
import { ClassPage } from '../pages/class/class';
import { MainstudentPage } from '../pages/mainstudent/mainstudent';
import { AddparentPage } from '../pages/addparent/addparent';
import { AddstudentPage } from '../pages/addstudent/addstudent';
import { SettingPage } from '../pages/setting/setting';
import { Test2Page } from '../pages/test2/test2';
import { AllchecknamePage } from '../pages/allcheckname/allcheckname';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TeacherPage,
    MainteacherPage,
    MainstudentPage,
    StudentPage,
    SettingPage,
    TestPage,
    StudentDetailPage,
    EditteacherPage,
    ClassPage,
    AddclassPage,
    AddparentPage,
    AddstudentPage,
    TestaddstudentPage,
    EditstudentPage,
    Test2Page,
    // EditstatusPage,
    CheckreceivePage,
    SettingStatusreceivePage,
    EditclassPage,
    AllrarentPage,
    AllchecknamePage,
    EditparentPage


  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()


  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TeacherPage,
    MainteacherPage,
    StudentPage,
    MainstudentPage,
    SettingPage,
    TestPage,
    StudentDetailPage,
    EditteacherPage,
    ClassPage,
    AddclassPage,
    AddparentPage,
    AddstudentPage,
    TestaddstudentPage,
    EditstudentPage,
    Test2Page,
    // EditstatusPage,
    CheckreceivePage,
    SettingStatusreceivePage,
    EditclassPage,
    AllrarentPage,
    AllchecknamePage,
    EditparentPage



  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
enableProdMode();
