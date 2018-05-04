import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-po-freightcosts',
  templateUrl: './po-freightcosts.component.html',
  styleUrls: ['./po-freightcosts.component.css']
})
export class POFreightCostsComponent {
  @Input() freightcosts;
  @Output() freightcostsChange: EventEmitter<any> = new EventEmitter();
  onCostChange() {
    const result = {
      'freightcosts': this.freightcosts
    };
    this.freightcostsChange.emit(result);
  }
  checkValue(e) {
    if (e.target.value < 0) { e.target.value = undefined; }
  }
}
