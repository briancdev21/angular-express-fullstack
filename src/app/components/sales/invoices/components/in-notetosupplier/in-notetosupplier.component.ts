import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-in-notetosupplier',
  templateUrl: './in-notetosupplier.component.html',
  styleUrls: ['./in-notetosupplier.component.css']
})
export class InNoteToSupplierComponent {
  @Input() noteToSupplier;
  @Output() changedNote: EventEmitter<any> = new EventEmitter();
  changeNote() {
    this.changedNote.emit(this.noteToSupplier);
  }
}
