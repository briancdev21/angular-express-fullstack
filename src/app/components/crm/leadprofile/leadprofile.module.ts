import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AutocompleteModule } from 'ng2-input-autocomplete';
import { LeadProfileComponent } from './leadprofile.component';
import { CommonCmpModule } from '../../../components/common/common.module';
import { BreadcrumbModule } from '../../../components/breadcrumb/breadcrumb.module';

import { TabModule } from 'angular-tabs-component';
import { Ng2TimelineComponent } from '../../profile/ng2-timeline/ng2timeline.component';
import { GetDate } from '../../profile/ng2-timeline/getDate.pipe';
import { GetDateStatus } from '../../profile/ng2-timeline/getDateStatus.pipe';
import { FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ProfileCmpModule } from '../../profile/profile.module';


@NgModule({
  declarations: [
    LeadProfileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    BreadcrumbModule,
    CommonCmpModule,
    TabModule,
    AutocompleteModule,
    FormsModule,
    ImageCropperModule,
    ProfileCmpModule
  ],
  exports: [
  ]
})
export class LeadProfileCmpModule { }
