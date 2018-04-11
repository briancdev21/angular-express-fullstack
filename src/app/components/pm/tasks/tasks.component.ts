import { Component, ChangeDetectorRef, Input, OnInit, HostListener, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: [
    './tasks.component.css',
  ],
  providers: []
})


export class TasksComponent implements OnInit {

  ngOnInit() {

  }
}
