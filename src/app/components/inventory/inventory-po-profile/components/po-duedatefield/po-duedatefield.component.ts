import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-po-duedatefield',
  templateUrl: './po-duedatefield.component.html',
  styleUrls: ['./po-duedatefield.component.css'],
})
export class PODueDateFieldComponent implements OnInit {
  @Input() set dueDate(val: string) {
    const offset = new Date().getTimezoneOffset();
    const timestamp = new Date(val).getTime() + 60000 * offset;
    this._dueDate = new Date(timestamp);
  }
  @Input() set createdDate(val: string) {
    this._createdDate = new Date(val);
  }
  yesterday: Date;
  _dueDate: Date;
  _createdDate: Date;

  @Output() dueDateChanged: EventEmitter<any> = new EventEmitter();


  ngOnInit() {
  }

  selectCreatedFrom(event) {
    this._dueDate = event.value;
    this.dueDateChanged.emit(event.value.toJSON().slice(0, 10));
  }
}
