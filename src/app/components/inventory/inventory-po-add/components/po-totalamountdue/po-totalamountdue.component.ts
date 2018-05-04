import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-po-totalamountdue',
  templateUrl: './po-totalamountdue.component.html',
  styleUrls: ['./po-totalamountdue.component.css']
})
export class POTotalAamountDueComponent {
  @Input() totalamountdue;
}
