import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-in-internalmemo',
  templateUrl: './in-internalmemo.component.html',
  styleUrls: ['./in-internalmemo.component.css']
})
export class InInternalMemoComponent {
  @Input() internalMemo;
}
