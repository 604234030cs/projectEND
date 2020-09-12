import { EditstudentPage } from './../pages/editstudent/editstudent';
import { TestaddstudentPage } from './../pages/testaddstudent/testaddstudent';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TeacherPage } from '../pages/teacher/teacher';
import { MainteacherPage } from '../pages/mainteacher/mainteacher';
import { StudentPage } from '../pages/student/student';

import { RecordStudentPage } from '../pages/record-student/record-student';
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



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TeacherPage,
    MainteacherPage,
    MainstudentPage,
    StudentPage,

    RecordStudentPage,
    TestPage,
    StudentDetailPage,
    EditteacherPage,
    ClassPage,
    AddclassPage,
    AddparentPage,
    AddstudentPage,
    TestaddstudentPage,
    EditstudentPage


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

    RecordStudentPage,
    TestPage,
    StudentDetailPage,
    EditteacherPage,
    ClassPage,
    AddclassPage,
    AddparentPage,
    AddstudentPage,
    TestaddstudentPage,
    EditstudentPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
