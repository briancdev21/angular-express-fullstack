import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-in-totalamountdue',
  templateUrl: './in-totalamountdue.component.html',
  styleUrls: ['./in-totalamountdue.component.css']
})
export class InTotalAamountDueComponent {
  @Input() totalamountdue;
}
