import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';

import { TabModule } from 'angular-tabs-component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ClickOutsideModule } from 'ng4-click-outside';
import { Ng2CompleterModule } from 'ng2-completer';
import { ImageUploadModule } from 'angular2-image-upload';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


import { ProductDetailsComponent } from './productdetails/productdetails.component';
import { ProjectDetailsComponent } from './projectdetails/projectdetails.component';
import { ScheduleMultiKeywordComponent } from './schedulemultikeyword/schedulemultikeyword.component';
import { MassEditComponent } from './massedit/massedit.component';
import { ProductListTableComponent } from './productlisttable/productlisttable.component';
import { AddProductModalComponent } from './addproductmodal/addproductmodal.component';
import { MultiVariantsSelectComponent } from './addproductmodal/multivariantsselect/multivariantsselect.component';

import { ProposalService } from './proposal.service';
import { SubmenuComponent } from '../../submenu/submenu.component';
import { ProfileCmpModule } from '../../profile/profile.module';
import { ArraySortPipe } from './pipes/arraysort.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { Pipe, PipeTransform } from '@angular/core';
import { AddProposalTaskComponent } from './addproposaltask/addproposaltask.component';
import { SearchProjectComponent } from './searchproject/searchproject.component';
import { InvoicesCmpModule } from '../invoices/invoices.module';
import { CommonCmpModule } from '../../common/common.module';
import { MultiSubCategoriesSelectComponent } from '../addproposal/multisubcategoriesselect/multisubcategoriesselect.component';
import { MultiCategoriesSelectComponent } from '../addproposal/multicategoriesselect/multicategoriesselect.component';

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
    AddProposalTaskComponent,
    SearchProjectComponent,
    MultiVariantsSelectComponent,
    MultiCategoriesSelectComponent,
    MultiSubCategoriesSelectComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    TabModule,
    NgSelectModule,
    FormsModule,
    ProfileCmpModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    ClickOutsideModule,
    Ng2CompleterModule,
    ImageUploadModule.forRoot(),
    InvoicesCmpModule,
    CommonCmpModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  exports: [
    ProductDetailsComponent,
    ProjectDetailsComponent,
    MassEditComponent,
    ProductListTableComponent,
    AddProductModalComponent,
    ScheduleMultiKeywordComponent,
    AddProposalTaskComponent,
    SearchProjectComponent,
    MultiSubCategoriesSelectComponent,
    MultiCategoriesSelectComponent,
  ],
  providers: [ProposalService]
})
export class ProposalCmpModule { }
