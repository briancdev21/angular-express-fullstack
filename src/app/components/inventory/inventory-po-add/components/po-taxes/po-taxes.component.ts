import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-po-taxes',
  templateUrl: './po-taxes.component.html',
  styleUrls: ['./po-taxes.component.css']
})
export class POTaxesComponent {
  @Input() taxes;
  @Output() taxesChange: EventEmitter<any> = new EventEmitter();

  onTaxChange() {
    const result = this.taxes;
    this.taxesChange.emit(result);
  }
}
