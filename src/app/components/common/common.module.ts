import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { Router, RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CommonComponent
  ],
  imports: [
    BrowserModule,
    RouterModule
  ],
  exports: [
    CommonComponent
  ]
})
export class CommonCmpModule { }
