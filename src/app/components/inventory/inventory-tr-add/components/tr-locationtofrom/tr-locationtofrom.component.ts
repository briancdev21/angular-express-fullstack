import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tr-locationtofrom',
  templateUrl: './tr-locationtofrom.component.html',
  styleUrls: ['./tr-locationtofrom.component.css']
})
export class TRLocationFromToComponent implements OnInit {

  @Input() set locations(_locations: any[]) {
    this.locations_local = _locations;
  }

  @Output() selectedLocation: EventEmitter<any> = new EventEmitter();
  locations_local = [];
  toLocation = 'default';
  fromLocation = 'default';

  onchangeToLocation (event) {
    this.toLocation = event.target.value;
    this.emitData();
  }
  onchangeFromLocation (event) {
    this.fromLocation = event.target.value;
    this.emitData();
  }

  emitData() {
    const data = {
      toLocation: this.toLocation,
      fromLocation: this.fromLocation
    };
    this.selectedLocation.emit(data);
  }

  ngOnInit() {
  }
}
