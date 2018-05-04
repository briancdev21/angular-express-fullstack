import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-po-duedatefield',
  templateUrl: './po-duedatefield.component.html',
  styleUrls: ['./po-duedatefield.component.css']
})
export class PODueDateFieldComponent implements OnInit {
  @Input() dueDate;
  yesterday: Date;

  ngOnInit() {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    this.yesterday = date;
  }

  selectCreatedFrom(event) {
    this.dueDate = event.value;
  }
}
