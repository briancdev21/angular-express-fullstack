import {Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation} from '@angular/core';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';
@Component({
  selector: 'app-in-class',
  templateUrl: './in-class.component.html',
  styleUrls: ['./in-class.component.css']
})
export class InClassComponent implements OnInit {

  @Input() set classList(_classificationes: any[]) {
    _classificationes.forEach((classification, index) => {
      this.classifications.push({'name': classification.name, 'value': index});
    });
  }
  @Output() selectedClass: EventEmitter<any> = new EventEmitter();
  classifications = [];

  private searchStr: string;
  dataService: CompleterData;


  constructor(private completerService: CompleterService) {
    this.dataService = completerService.local(this.classifications, 'name', 'name');
  }

  ngOnInit() {
  }

  onSelected(item: CompleterItem) {
    if (item) {
      this.selectedClass.emit(item.originalObject.value);
    }
  }

}
