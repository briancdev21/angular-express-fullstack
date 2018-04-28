import { Component, OnInit, Input, ViewEncapsulation  } from '@angular/core';

@Component({
  selector: 'app-in-createddatefield',
  templateUrl: './in-createddatefield.component.html',
  styleUrls: ['./in-createddatefield.component.css']
})
export class InCreatedDateFieldComponent implements OnInit {
  @Input() createdDate;
  yesterday: Date;

  ngOnInit() {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    this.yesterday = date;
  }
  selectCreatedFrom(event) {
    this.createdDate = event.value;
  }
}
