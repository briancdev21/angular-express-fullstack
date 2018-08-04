import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tr-datetransferfield',
  templateUrl: './tr-datetransferfield.component.html',
  styleUrls: ['./tr-datetransferfield.component.css']
})
export class TRDateTransferFieldComponent implements OnInit {
  @Input() transferdate;
  today: Date;

  ngOnInit() {
    const date = new Date();
  }
  selectCreatedFrom(event) {
    this.transferdate = event.value;
  }
}
