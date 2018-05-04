import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-po-orderidfield',
  templateUrl: './po-orderidfield.component.html',
  styleUrls: ['./po-orderidfield.component.css']
})
export class POOrderIdFieldComponent {
  @Input() po_id;
}
