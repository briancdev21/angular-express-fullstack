import { Component, OnInit, Input, ViewEncapsulation, EventEmitter, Output  } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-in-createddatefield',
  templateUrl: './in-createddatefield.component.html',
  styleUrls: ['./in-createddatefield.component.css']
})
export class InCreatedDateFieldComponent implements OnInit {
  @Input() createdDate;
  @Output() changedCreatedDate: EventEmitter<any> = new EventEmitter();
  yesterday: Date;

  ngOnInit() {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    this.yesterday = date;
    this.createdDate = moment(this.createdDate).format('YYYY-MM-DD');
  }
  selectCreatedFrom(event) {
    this.createdDate = event.value;
    this.changedCreatedDate.emit(moment(this.createdDate).format('YYYY-MM-DD'));
  }
}
