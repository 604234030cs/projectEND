import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecordStudentPage } from './record-student';

@NgModule({
  declarations: [
    RecordStudentPage,
  ],
  imports: [
    IonicPageModule.forChild(RecordStudentPage),
  ],
})
export class RecordStudentPageModule {}
