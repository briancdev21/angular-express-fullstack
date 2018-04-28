import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-in-subtotalproducts',
  templateUrl: './in-subtotalproducts.component.html',
  styleUrls: ['./in-subtotalproducts.component.css']
})
export class InSubTotalProductsComponent implements OnInit {
  @Input() subtotalproducts;

  ngOnInit() {
    if (this.subtotalproducts) {
      this.subtotalproducts = this.subtotalproducts.toFixed(2);
    }
  }
}
