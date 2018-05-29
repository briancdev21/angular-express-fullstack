import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-po-internalmemo',
  templateUrl: './po-internalmemo.component.html',
  styleUrls: ['./po-internalmemo.component.css']
})
export class POInternalMemoComponent {

  @Output() memoChanged: EventEmitter<any> = new EventEmitter();

  onMemoChange(event) {
    this.memoChanged.emit(event.target.value);
  }
}
