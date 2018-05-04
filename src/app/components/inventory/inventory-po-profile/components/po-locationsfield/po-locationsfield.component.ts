import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-po-locationsfield',
  templateUrl: './po-locationsfield.component.html',
  styleUrls: ['./po-locationsfield.component.css']
})
export class POLocationSelectorComponent implements OnInit {

  @Input() locations;
  @Input() selectedLocation;
  locations_local = [];

  ngOnInit() {
    console.log(this.locations);
    if (this.locations) {
      this.locations_local = this.locations;
    }
  }

}
