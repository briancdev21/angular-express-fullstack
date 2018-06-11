import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-po-locationsfield',
  templateUrl: './po-locationsfield.component.html',
  styleUrls: ['./po-locationsfield.component.css']
})
export class POLocationSelectorComponent implements OnInit {
  @Input() set selectedLocationData(val: number) {
    this.selectedLocationId = val;
  }
  @Input() set locations(_locations: any[]) {
    this.locations_local = _locations;
  }
  @Output() selectedLocation: EventEmitter<any> = new EventEmitter();
  locations_local = [];
  selectedLocationId: number;
  ngOnInit() {
  }

  onchange(event) {
    this.selectedLocation.emit(event.target.value);
  }
}
