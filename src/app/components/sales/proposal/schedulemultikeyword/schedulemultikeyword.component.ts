import { Component, Input, ViewChild, ElementRef, AfterViewInit, Renderer, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-schedulemultikeyword',
  templateUrl: './schedulemultikeyword.component.html',
  styleUrls: [
    './schedulemultikeyword.component.css'
  ]
})

export class ScheduleMultiKeywordComponent implements AfterViewInit, OnInit {
  @Input() keywords;
  @ViewChild('box') input: ElementRef;
  @Output() scheduleRemain: EventEmitter<any> = new EventEmitter;
  editable: boolean;
  newKeyword: string;
  schdulePercent: any;
  remaining = 100;

  constructor(private renderer: Renderer) {
    const comp = this;
    document.addEventListener('click', function() {
      comp.editable = false;
    });
  }

  ngOnInit() {
    this.editable = false;
    let proposalTotal = 0;
    let proposalRemaining;
    if (this.keywords.length > 0) {
      for (let i = 0; i < this.keywords.length ; i ++) {
        proposalTotal = proposalTotal + parseInt(this.keywords[i], 10);
      }
      proposalRemaining = 100 - proposalTotal;
      if (proposalRemaining >= 0) {
        this.scheduleRemain.emit(proposalRemaining);
      }
    }
  }

  ngAfterViewInit() {
    this.input.nativeElement.focus();
  }

  checkValue(e) {
    if (this.schdulePercent <= 0 || this.schdulePercent > 100) { this.schdulePercent = undefined; }
  }

  addSchdule() {
    let total = 0;
    let a;
    if (this.schdulePercent) {
      for (let i = 0; i < this.keywords.length ; i ++) {
        total = total + parseInt(this.keywords[i], 10);
      }
      a = 100 - total - this.schdulePercent;
      if (a >= 0) {
        this.remaining = a;
        this.keywords.push(this.schdulePercent);
        this.scheduleRemain.emit(this.remaining);
        this.schdulePercent = undefined;
      } else {
        this.remaining = 100 - total;
      }
    }
  }

  removeSchedule(index) {
    let total = 0;
    this.keywords.splice(index, 1);
    for (let i = 0; i < this.keywords.length ; i ++) {
      total = total + this.keywords[i];
    }
    this.remaining = 100 - total;
    this.scheduleRemain.emit(this.remaining);
  }

}
