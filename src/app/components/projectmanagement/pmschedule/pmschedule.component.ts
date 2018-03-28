import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { PmService } from '../pm.service';

@Component({
  selector: 'app-pmschedule',
  templateUrl: './pmschedule.component.html',
  styleUrls: [
    './pmschedule.component.css',
  ]
})

export class PmScheduleComponent implements OnInit {
  @ViewChild('tabsRef', {read: ElementRef}) tabsRef: ElementRef;

  constructor( private pmService: PmService ) {
  }

  ngOnInit() {

  }
}
