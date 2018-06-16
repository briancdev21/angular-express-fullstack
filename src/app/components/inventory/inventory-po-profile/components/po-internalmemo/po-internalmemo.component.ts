import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-po-internalmemo',
  templateUrl: './po-internalmemo.component.html',
  styleUrls: ['./po-internalmemo.component.css']
})
export class POInternalMemoComponent {
  @Input() set internalMemoData(val: string) {
    this.internalMemo = val;
  }
  @Output() memoChanged: EventEmitter<any> = new EventEmitter();
  internalMemo: string;

  onMemoChange(event) {
    this.memoChanged.emit(event.target.value);
  }
}
