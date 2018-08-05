import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tr-locationtofrom',
  templateUrl: './tr-locationtofrom.component.html',
  styleUrls: ['./tr-locationtofrom.component.css']
})
export class TRLocationFromToComponent implements OnInit {

  @Input() set toLocations(_locations: any[]) {
    this.to_locations_local = _locations;
  }
  @Input() set fromLocations(_locations: any[]) {
    this.from_locations_local = _locations;
  }

  @Input() fromLocation;
  @Input() toLocation;

  @Output() selectedLocation: EventEmitter<any> = new EventEmitter();
  from_locations_local = [];
  to_locations_local = [];
  fromLocationError: boolean;
  toLocationError: boolean;


  onchangeToLocation (event) {
    this.toLocation = event.target.value;
    if (this.toLocation === this.fromLocation) {
      this.toLocationError = true;
    } else {
      this.toLocationError = false;
      this.emitData();
    }
  }
  onchangeFromLocation (event) {
    this.fromLocation = event.target.value;
    if (this.toLocation === this.fromLocation) {
      this.fromLocationError = true;
    } else {
      this.fromLocationError = false;
      this.emitData();
    }
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
