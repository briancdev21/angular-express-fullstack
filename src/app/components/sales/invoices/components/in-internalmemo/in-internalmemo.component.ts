import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-in-internalmemo',
  templateUrl: './in-internalmemo.component.html',
  styleUrls: ['./in-internalmemo.component.css']
})
export class InInternalMemoComponent {
  @Input() internalMemo;
  @Output() changedMemo: EventEmitter<any> = new EventEmitter();
  changeMemo() {
    this.changedMemo.emit(this.internalMemo);
  }
}
