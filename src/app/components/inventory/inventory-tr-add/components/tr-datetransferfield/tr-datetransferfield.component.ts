import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tr-datetransferfield',
  templateUrl: './tr-datetransferfield.component.html',
  styleUrls: ['./tr-datetransferfield.component.css']
})
export class TRDateTransferFieldComponent implements OnInit {
  @Input() transferdate;
  yesterday: Date;

  ngOnInit() {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    this.yesterday = date;
  }
  selectCreatedFrom(event) {
    this.transferdate = event.value;
  }
}
