import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tr-locationtofrom',
  templateUrl: './tr-locationtofrom.component.html',
  styleUrls: ['./tr-locationtofrom.component.css']
})
export class TRLocationFromToComponent implements OnInit {

  @Input() locations;
  @Input() selectedFromLocation;
  @Input() selectedToLocation;
  locations_local = [];

  ngOnInit() {
    console.log(this.locations);
    if (this.locations) {
      this.locations_local = this.locations;
    }
  }

}
