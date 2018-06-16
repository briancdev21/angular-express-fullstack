import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-po-notetosupplier',
  templateUrl: './po-notetosupplier.component.html',
  styleUrls: ['./po-notetosupplier.component.css']
})
export class PONoteToSupplierComponent {
  
  @Output() noteChanged: EventEmitter<any> = new EventEmitter();

  onNoteChange(event) {
    // Note Changed
    this.noteChanged.emit(event.target.value);
  }
}
