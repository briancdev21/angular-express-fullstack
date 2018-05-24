import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-po-freightcosts',
  templateUrl: './po-freightcosts.component.html',
  styleUrls: ['./po-freightcosts.component.css']
})
export class POFreightCostsComponent {
  @Input() freightcosts;
  @Output() freightcostsChange: EventEmitter<any> = new EventEmitter();
  @ViewChild("editInput", {read: ElementRef}) editInput: ElementRef;
  isEditable = true;

  constructor(private rd: Renderer2) {}

  onCostChange() {
    const result = {
      'freightcosts': this.freightcosts
    };
    this.freightcostsChange.emit(result);
  }
  checkValue(e) {
    if (e.target.value < 0) { e.target.value = undefined; }
  }

  showEditInput() {
    this.isEditable = true;
  }

  hideEditInput() {
    this.isEditable = false;
  }
}
