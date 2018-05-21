import {Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation} from '@angular/core';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';
@Component({
  selector: 'app-ng2completer',
  templateUrl: './ng2completer.component.html',
  styleUrls: ['./ng2completer.component.css']
})
export class Ng2CompleterComponent implements OnInit {

  @Input() itemsList;
  @Input() searchStr;
  @Output() selectedItem: EventEmitter<any> = new EventEmitter();
  items = [];

  dataService: CompleterData;


  constructor(private completerService: CompleterService) {
    this.dataService = completerService.local(this.items, 'name', 'name');
  }

  ngOnInit() {
    this.itemsList
      .forEach((item, index) => {
        this.items.push({'name': item});
      });
  }

  onSelected(item: CompleterItem) {
    if (item) {
      this.selectedItem.emit(item.title);
    }
  }

}
