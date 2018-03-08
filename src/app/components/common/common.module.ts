import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { Ng2CompleterComponent } from './ng2completer/ng2completer.component';
import { Ng2CompleterModule,  } from 'ng2-completer';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CommonComponent,
    Ng2CompleterComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    Ng2CompleterModule
  ],
  exports: [
    CommonComponent,
    Ng2CompleterComponent
  ]
})
export class CommonCmpModule { }
