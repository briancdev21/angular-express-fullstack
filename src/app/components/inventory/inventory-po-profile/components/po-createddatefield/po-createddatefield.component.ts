import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-po-createddatefield',
  templateUrl: './po-createddatefield.component.html',
  styleUrls: ['./po-createddatefield.component.css']
})
export class POCreatedDateFieldComponent implements OnInit {
  @Input() set createdDate(val: string) {
    this._createdDate = new Date(val);
  }
  _createdDate: Date;

  ngOnInit() {
  }
  selectCreatedFrom(event) {
    this.createdDate = event.value;
  }
}
