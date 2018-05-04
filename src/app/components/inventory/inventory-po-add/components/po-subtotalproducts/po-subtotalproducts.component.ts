import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-po-subtotalproducts',
  templateUrl: './po-subtotalproducts.component.html',
  styleUrls: ['./po-subtotalproducts.component.css']
})
export class POSubTotalProductsComponent {
  @Input() subtotalproducts;
}
