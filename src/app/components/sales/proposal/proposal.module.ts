import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AutocompleteModule } from 'ng2-input-autocomplete';
import { TabModule } from 'angular-tabs-component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ClickOutsideModule } from 'ng4-click-outside';
import { Ng2CompleterModule } from 'ng2-completer';
import { ImageUploadModule } from 'angular2-image-upload';


import { ProductDetailsComponent } from './productdetails/productdetails.component';
import { ProjectDetailsComponent } from './projectdetails/projectdetails.component';
import { ScheduleMultiKeywordComponent } from './schedulemultikeyword/schedulemultikeyword.component';
import { MassEditComponent } from './massedit/massedit.component';
import { ProductListTableComponent } from './productlisttable/productlisttable.component';
import { AddProductModalComponent } from './addproductmodal/addproductmodal.component';
import { SharedService } from './shared.service';
import { SubmenuComponent } from '../../submenu/submenu.component';

import { ProfileCmpModule } from '../../profile/profile.module';

import { ArraySortPipe } from './pipes/arraysort.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { Pipe, PipeTransform } from '@angular/core';



@NgModule({
  declarations: [
    ProductDetailsComponent,
    ProjectDetailsComponent,
    MassEditComponent,
    ProductListTableComponent,
    AddProductModalComponent,
    ScheduleMultiKeywordComponent,
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
    ClickOutsideModule,
    Ng2CompleterModule,
    ImageUploadModule.forRoot(),
  ],
  exports: [
    ProductDetailsComponent,
    ProjectDetailsComponent,
    MassEditComponent,
    ProductListTableComponent,
    AddProductModalComponent,
    ScheduleMultiKeywordComponent,
  ],
  providers: [SharedService]
})
export class ProposalCmpModule { }
