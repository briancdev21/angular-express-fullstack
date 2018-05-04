import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-po-switcher',
  templateUrl: './po-switcher.component.html',
  styleUrls: ['./po-switcher.component.css']
})
export class POSwitcherComponent implements OnInit {
  @Input() label;
  @Output() switchChanged: EventEmitter<any> = new EventEmitter();
  status: boolean;
  labelText = 'Switch';

  constructor() {
    this.status = false;
  }

  ngOnInit() {
    if (this.label) {
      this.labelText = this.label;
    }
  }

  onChangeStatus() {
    this.status = !this.status;
    this.switchChanged.emit(this.status);
  }
}
