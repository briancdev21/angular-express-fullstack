import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-po-locationsfield',
  templateUrl: './po-locationsfield.component.html',
  styleUrls: ['./po-locationsfield.component.css']
})
export class POLocationSelectorComponent implements OnInit {

  @Input() set locations(_locations: any[]) {
    this.locations_local = _locations;
  };
  @Output() selectedLocation: EventEmitter<any> = new EventEmitter();
  locations_local = [];

  ngOnInit() {
    
  }

  onchange(event) {
    this.selectedLocation.emit(event.target.value);
  }
}
