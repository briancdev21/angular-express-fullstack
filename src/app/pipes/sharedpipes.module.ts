import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PhonePipe } from './phone.pipe';
import { ArraySortPipe } from './arraysort.pipe';
import { SearchPipe } from './search.pipe';
import {Pipe, PipeTransform} from '@angular/core';

@NgModule({
  declarations: [
    PhonePipe,
    ArraySortPipe,
    SearchPipe
  ],
  imports: [
  ],
  exports: [
    PhonePipe,
    ArraySortPipe,
    SearchPipe
  ]
})
export class SharedPipesModule { }
