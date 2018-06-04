import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NgSelectModule } from '@ng-select/ng-select';
import { LeadProfileComponent } from './leadprofile.component';
import { CommonCmpModule } from '../../../components/common/common.module';
import { BreadcrumbModule } from '../../../components/breadcrumb/breadcrumb.module';
import { LeadProfileCardsComponent } from './leadprofilecards/leadprofilecards.component';
import { LeadScoreComponent } from './leadprofilecards/leadscore/leadscore.component';
import { LeadProfileInfoBarComponent } from './leadprofileinfobar/leadprofileinfobar.component';

import { TabModule } from 'angular-tabs-component';
import { Ng2TimelineComponent } from '../../profile/ng2-timeline/ng2timeline.component';
import { GetDate } from '../../profile/ng2-timeline/getDate.pipe';
import { GetDateStatus } from '../../profile/ng2-timeline/getDateStatus.pipe';
import { FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ProfileCmpModule } from '../../profile/profile.module';


@NgModule({
  declarations: [
    LeadProfileComponent,
    LeadProfileCardsComponent,
    LeadScoreComponent,
    LeadProfileInfoBarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    BreadcrumbModule,
    CommonCmpModule,
    TabModule,
    NgSelectModule,
    FormsModule,
    ImageCropperModule,
    ProfileCmpModule
  ],
  exports: [
  ]
})
export class LeadProfileCmpModule { }
