import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-in-freightcosts',
  templateUrl: './in-freightcosts.component.html',
  styleUrls: ['./in-freightcosts.component.css']
})
export class InFreightCostsComponent {
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
