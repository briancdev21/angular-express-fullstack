import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-po-internalmemo',
  templateUrl: './po-internalmemo.component.html',
  styleUrls: ['./po-internalmemo.component.css']
})
export class POInternalMemoComponent {
  @Input() internalMemo;
}
