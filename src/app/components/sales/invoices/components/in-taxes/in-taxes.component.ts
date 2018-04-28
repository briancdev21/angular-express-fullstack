import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-in-taxes',
  templateUrl: './in-taxes.component.html',
  styleUrls: ['./in-taxes.component.css']
})
export class InTaxesComponent implements OnInit {
  @Input() taxes;
  @Output() taxesChange: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    if (this.taxes) {
      this.taxes = Number(this.taxes);
    }
  }

  onTaxChange() {
    const result = this.taxes;
    this.taxesChange.emit(result);
  }
}
