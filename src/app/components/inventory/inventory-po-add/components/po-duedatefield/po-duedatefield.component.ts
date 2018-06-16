import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-po-duedatefield',
  templateUrl: './po-duedatefield.component.html',
  styleUrls: ['./po-duedatefield.component.css'],
})
export class PODueDateFieldComponent implements OnInit {
  @Input() set dueDate(val) {
    const m = moment(val);
    const s = m.format();
    console.log('dueDate: ', s);
    this._dueDate = s;
  }
  _dueDate: string;
  yesterday: Date;

  @Output() dueDateChanged: EventEmitter<any> = new EventEmitter();


  ngOnInit() {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    this.yesterday = date;
  }

  selectCreatedFrom(event) {
    this._dueDate = event.value;
    this.dueDateChanged.emit(event.value.toJSON().slice(0, 10));
  }
}
