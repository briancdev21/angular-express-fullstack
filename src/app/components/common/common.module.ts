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

@NgModule({
  declarations: [
    CommonComponent,
    Ng2CompleterComponent,
    HorizontalBarComponent,
    MorrisDonutComponent,
    MorrisLineComponent,
    MorrisAreaComponent,
    MorrisBarChartComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    Ng2CompleterModule
  ],
  exports: [
    CommonComponent,
    Ng2CompleterComponent,
    HorizontalBarComponent,
    MorrisDonutComponent,
    MorrisLineComponent,
    MorrisAreaComponent,
    MorrisBarChartComponent
  ]
})
export class CommonCmpModule { }
