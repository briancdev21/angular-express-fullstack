import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AutocompleteModule } from 'ng2-input-autocomplete';
import { TabModule } from 'angular-tabs-component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { ProductDetailsComponent } from './productdetails/productdetails.component';
import { ProjectDetailsComponent } from './projectdetails/projectdetails.component';
import { AddProposalTaskComponent } from './addproposaltask/addproposaltask.component';
import { SearchProjectComponent } from './searchproject/searchproject.component';
import { MassEditComponent } from './massedit/massedit.component';
import { ProductListTableComponent } from './productlisttable/productlisttable.component';

import { ProfileCmpModule } from '../profile/profile.module';

import { ArraySortPipe } from './pipes/arraysort.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { Pipe, PipeTransform } from '@angular/core';



@NgModule({
  declarations: [
    ProductDetailsComponent,
    ProjectDetailsComponent,
    AddProposalTaskComponent,
    SearchProjectComponent,
    MassEditComponent,
    ProductListTableComponent,
    ArraySortPipe,
    SearchPipe,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    TabModule,
    AutocompleteModule,
    FormsModule,
    ProfileCmpModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
  ],
  exports: [
    ProductDetailsComponent,
    ProjectDetailsComponent,
    AddProposalTaskComponent,
    SearchProjectComponent,
    MassEditComponent,
    ProductListTableComponent,
  ]
})
export class ProposalCmpModule { }
