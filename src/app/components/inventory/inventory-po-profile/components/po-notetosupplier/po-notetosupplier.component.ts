import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-po-notetosupplier',
  templateUrl: './po-notetosupplier.component.html',
  styleUrls: ['./po-notetosupplier.component.css']
})
export class PONoteToSupplierComponent {
  @Input() set supplierNoteData(val: string) {
    this.supplierNote = val;
  }
  @Output() noteChanged: EventEmitter<any> = new EventEmitter();
  supplierNote: string;
  onNoteChange(event) {
    // Note Changed
    this.noteChanged.emit(event.target.value);
  }
}
