import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-in-duedatefield',
  templateUrl: './in-duedatefield.component.html',
  styleUrls: ['./in-duedatefield.component.css']
})
export class InDueDateFieldComponent implements OnInit {
  @Input() dueDate;
  @Input() title;
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
