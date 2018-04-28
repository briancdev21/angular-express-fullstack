import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-in-deposits-credits',
  templateUrl: './in-deposits-credits.component.html',
  styleUrls: ['./in-deposits-credits.component.css']
})
export class InDepositsCreditsComponent {
  @Input() depositsAmount;
  @Output() depositsChange: EventEmitter<any> = new EventEmitter();

  onDepositsChange() {
    const result = {
      depositsAmount: this.depositsAmount
    };
    this.depositsChange.emit(result);
  }

  checkValue(e) {
    if (e.target.value < 0) { e.target.value = undefined; }
  }
}
