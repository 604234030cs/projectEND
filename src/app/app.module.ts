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
import { CheckDistancePage } from '../pages/check-distance/check-distance';
import { RecordStudentPage } from '../pages/record-student/record-student';
import { IonicStorageModule } from '@ionic/storage';
import { TestPage } from '../pages/test/test';
import { MainstudentPage } from '../pages/mainstudent/mainstudent';
import { StudentDetailPage } from '../pages/student-detail/student-detail';
import { EditteacherPage } from '../pages/editteacher/editteacher';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TeacherPage,
    MainteacherPage,
    MainstudentPage,
    StudentPage,
    CheckDistancePage,
    RecordStudentPage,
    TestPage,
    StudentDetailPage,
    EditteacherPage
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
    CheckDistancePage,
    RecordStudentPage,
    TestPage,
    StudentDetailPage,
    EditteacherPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
