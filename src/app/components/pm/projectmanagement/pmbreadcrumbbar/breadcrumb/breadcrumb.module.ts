import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PmBreadcrumbComponent } from './breadcrumb.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PmBreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    RouterModule
  ],
  exports: [
    PmBreadcrumbComponent
  ]
})
export class PMBreadcrumbModule { }
