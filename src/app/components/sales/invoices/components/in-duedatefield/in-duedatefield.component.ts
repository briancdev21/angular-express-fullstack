import { Component, OnInit, Input, ViewEncapsulation, EventEmitter, Output  } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-in-duedatefield',
  templateUrl: './in-duedatefield.component.html',
  styleUrls: ['./in-duedatefield.component.css']
})
export class InDueDateFieldComponent implements OnInit {
  @Input() dueDate;
  @Input() title;
  @Output() changedDueDate: EventEmitter<any> = new EventEmitter();
  yesterday: Date;

  ngOnInit() {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    this.yesterday = date;
  }

  selectCreatedFrom(event) {
    this.dueDate = event.value;
    this.changedDueDate.emit(moment(this.dueDate).format('YYYY-MM-DD'));
  }
}
