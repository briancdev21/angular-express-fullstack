import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { Ng2CompleterComponent } from './ng2completer/ng2completer.component';
import { HorizontalBarComponent } from './horizontalbar/horizontalbar.component';
import { Ng2CompleterModule,  } from 'ng2-completer';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MorrisDonutComponent } from './morrisdonut/morrisdonut.component';
import { MorrisLineComponent } from './morrislinechart/morrislinechart.component';
import { MorrisAreaComponent } from './morrisareachart/morrisareachart.component';
import { MorrisBarChartComponent } from './morrisbarchart/morrisbarchart.component';
import { AgendaBoxComponent } from './agendabox/agendabox.component';
import { TasksBoxComponent } from './tasksbox/tasksbox.component';
import { ActivitiesBoxComponent } from './activitiesbox/activitiesbox.component';
import { AlertModalComponent } from './alertmodal/alertmodal.component';
import { MatInputModule, MatButtonModule, MatButtonToggleModule, MatCheckboxModule } from '@angular/material';

import { CommonService } from './common.service';
@NgModule({
  declarations: [
    CommonComponent,
    Ng2CompleterComponent,
    HorizontalBarComponent,
    MorrisDonutComponent,
    MorrisLineComponent,
    MorrisAreaComponent,
    MorrisBarChartComponent,
    AgendaBoxComponent,
    TasksBoxComponent,
    ActivitiesBoxComponent,
    AlertModalComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    Ng2CompleterModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
  ],
  exports: [
    CommonComponent,
    Ng2CompleterComponent,
    HorizontalBarComponent,
    MorrisDonutComponent,
    MorrisLineComponent,
    MorrisAreaComponent,
    MorrisBarChartComponent,
    AgendaBoxComponent,
    TasksBoxComponent,
    ActivitiesBoxComponent,
    AlertModalComponent
  ],
  providers: [
    CommonService
  ]
})
export class CommonCmpModule { }
