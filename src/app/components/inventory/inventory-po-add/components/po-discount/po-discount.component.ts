import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-po-discount',
  templateUrl: './po-discount.component.html',
  styleUrls: ['./po-discount.component.css']
})
export class PODiscountComponent {
  @Input() discountamount;
  @Input() set discountTypeIn(_discounttype: string) {
    this.discounttype = _discounttype;
  }

  @Output() discountChange: EventEmitter<any> = new EventEmitter();
  discounttype: string;
  isEditable = false;

  onDiscountChange() {
    const result = {
      type: this.discounttype,
      amount: this.discountamount
    };
    this.discountChange.emit(result);
  }


  onCheckDiscountRange(e) {
    if (e.target.value > 100 && this.discounttype === 'PERCENT') { e.target.value = 100; }
    if (e.target.value < 0) { e.target.value = undefined; }
  }
  onChangeDiscountType() {
    const result = {
      type: this.discounttype,
      amount: 0
    };
    this.discountChange.emit(result);
  }

  showEditInput() {
    this.isEditable = true;
  }

  hideEditInput() {
    this.isEditable = false;
  }
}
