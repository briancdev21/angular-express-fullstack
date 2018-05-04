import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-po-createddatefield',
  templateUrl: './po-createddatefield.component.html',
  styleUrls: ['./po-createddatefield.component.css']
})
export class POCreatedDateFieldComponent implements OnInit {
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
