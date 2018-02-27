import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonCmpModule } from '../common/common.module';
import { BreadcrumbComponent } from './breadcrumb.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    CommonCmpModule,
    RouterModule
  ],
  exports: [
    BreadcrumbComponent
  ]
})
export class BreadcrumbModule { }
