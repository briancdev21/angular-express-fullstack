import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-po-createddatefield',
  templateUrl: './po-createddatefield.component.html',
  styleUrls: ['./po-createddatefield.component.css']
})
export class POCreatedDateFieldComponent implements OnInit {
  @Input() createdDate;
  today: Date;

  ngOnInit() {
    const date = new Date();
    this.today = date;
  }
  selectCreatedFrom(event) {
    this.createdDate = event.value;
  }
}
