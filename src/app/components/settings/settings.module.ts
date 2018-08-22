import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TabModule } from 'angular-tabs-component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatButtonModule, MatButtonToggleModule, MatCheckboxModule } from '@angular/material';

import { ProfileCmpModule } from '../profile/profile.module';
import { CommonCmpModule } from '../common/common.module';
import { CompanySettingsComponent } from './companysettings/companysettings.component';
import { UserControlComponent } from './usercontrol/usercontrol.component';
import { CrmOptionsComponent } from './crmoptions/crmoptions.component';
import { SalesOptionsComponent } from './salesoptions/salesoptions.component';
import { InventoryOptionsComponent } from './inventoryoptions/inventoryoptions.component';
import { SettingsComponent } from './settings.component';

import { SettingsService } from './settings.service';
import { Ng2CompleterModule } from 'ng2-completer';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    CompanySettingsComponent,
    UserControlComponent,
    CrmOptionsComponent,
    SalesOptionsComponent,
    InventoryOptionsComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    TabModule,
    FormsModule,
    IonRangeSliderModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    ProfileCmpModule,
    CommonCmpModule,
    Ng2CompleterModule,
    NgSelectModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    SettingsComponent
  ],
  providers: [SettingsService]
})
export class SettingsCmpModule { }
