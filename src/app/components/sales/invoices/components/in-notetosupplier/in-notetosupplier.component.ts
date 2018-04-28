import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-in-notetosupplier',
  templateUrl: './in-notetosupplier.component.html',
  styleUrls: ['./in-notetosupplier.component.css']
})
export class InNoteToSupplierComponent {
  @Input() noteToSupplier;
}
