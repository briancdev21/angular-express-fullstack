import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-in-subtotalservices',
  templateUrl: './in-subtotalservices.component.html',
  styleUrls: ['./in-subtotalservices.component.css']
})
export class InSubTotalServicesComponent implements OnInit {
  @Input() subtotalservices;

  ngOnInit() {
    if (this.subtotalservices) {
      this.subtotalservices = this.subtotalservices.toFixed(2);
    }
  }
}
