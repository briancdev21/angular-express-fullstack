import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ad-locationtofrom',
  templateUrl: './ad-locationtofrom.component.html',
  styleUrls: ['./ad-locationtofrom.component.css']
})
export class AdLocationFromToComponent implements OnInit {

  @Input() set locations(_locations: any[]) {
    this.locations_local = _locations;
  }

  @Input() set adjustLocation(_location) {
    if (_location !== undefined) {
      this.fromLocation = _location;
    }
  }
  @Output() selectedLocation: EventEmitter<any> = new EventEmitter();
  locations_local = [];
  fromLocation = 'default';

  onchangeFromLocation (event) {
    this.fromLocation = event.target.value;
    this.selectedLocation.emit(event.target.value);
  }

  ngOnInit() {
  }
}
