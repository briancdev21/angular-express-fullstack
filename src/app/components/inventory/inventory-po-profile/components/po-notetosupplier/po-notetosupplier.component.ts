import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-po-notetosupplier',
  templateUrl: './po-notetosupplier.component.html',
  styleUrls: ['./po-notetosupplier.component.css']
})
export class PONoteToSupplierComponent {
  @Input() noteToSupplier;
}
