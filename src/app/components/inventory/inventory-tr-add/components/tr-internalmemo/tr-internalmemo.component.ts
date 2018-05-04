import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tr-internalmemo',
  templateUrl: './tr-internalmemo.component.html',
  styleUrls: ['./tr-internalmemo.component.css']
})
export class TRInternalMemoComponent {
  @Input() internalMemo;
}
