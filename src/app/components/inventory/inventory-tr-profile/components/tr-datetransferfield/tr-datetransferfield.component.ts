import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tr-datetransferfield',
  templateUrl: './tr-datetransferfield.component.html',
  styleUrls: ['./tr-datetransferfield.component.css']
})
export class TRDateTransferFieldComponent implements OnInit {
  @Input() transferdate;
  // @Output() dateChanged: EventEmitter<any> = new EventEmitter();
  today: Date;

  ngOnInit() {
    const date = new Date();
    this.today = date;
  }
  selectCreatedFrom(event) {
    this.transferdate = event.value;
    // this.dateChanged.emit(event.value);
  }
}
