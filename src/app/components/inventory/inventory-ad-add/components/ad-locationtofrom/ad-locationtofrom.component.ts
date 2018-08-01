import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ad-locationtofrom',
  templateUrl: './ad-locationtofrom.component.html',
  styleUrls: ['./ad-locationtofrom.component.css']
})
export class AdLocationFromToComponent implements OnInit {

  @Input() set fromLocations(_locations: any[]) {
    this.from_locations_local = _locations;
  }

  @Input() fromLocation;

  @Output() selectedLocation: EventEmitter<any> = new EventEmitter();
  from_locations_local = [];

  // @Output() selectedLocation: EventEmitter<any> = new EventEmitter();
  // locations_local = [];
  // fromLocation = 'default';

  onchangeFromLocation (event) {
    this.fromLocation = event.target.value;
    this.selectedLocation.emit(event.target.value);
  }

  ngOnInit() {
  }
}
