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
  @Input() set keywords(val) {
    if (!val) {
      val = [];
    }
    this._keywords = val;
    let proposalTotal = 0;
    let proposalRemaining;
    if (this._keywords.length > 0) {
      for (let i = 0; i < this._keywords.length ; i ++) {
        proposalTotal = proposalTotal + parseInt(this._keywords[i], 10);
      }
      proposalRemaining = 100 - proposalTotal;
      if (proposalRemaining >= 0) {
        this.scheduleRemain.emit({'remaining': proposalRemaining, 'keywords': this._keywords});
      }
    }
  }
  @ViewChild('box') input: ElementRef;
  @Output() scheduleRemain: EventEmitter<any> = new EventEmitter;
  editable: boolean;
  newKeyword: string;
  schdulePercent: any;
  remaining = 100;
  _keywords = [];

  constructor(private renderer: Renderer) {
    const comp = this;
    document.addEventListener('click', function() {
      comp.editable = false;
    });
  }

  ngOnInit() {
    this.editable = false;
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
      for (let i = 0; i < this._keywords.length ; i ++) {
        total = total + parseInt(this._keywords[i], 10);
      }
      a = 100 - total - this.schdulePercent;
      if (a >= 0) {
        this.remaining = a;
        this._keywords.push(this.schdulePercent);
        this.scheduleRemain.emit({'remaining': this.remaining, 'keywords': this._keywords});
        this.schdulePercent = undefined;
      } else {
        this.remaining = 100 - total;
      }
    }
  }

  removeSchedule(index) {
    let total = 0;
    this._keywords.splice(index, 1);
    for (let i = 0; i < this._keywords.length ; i ++) {
      total = total + this._keywords[i];
    }
    this.remaining = 100 - total;
    this.scheduleRemain.emit({'remaining': this.remaining, 'keywords': this._keywords});
  }

}
