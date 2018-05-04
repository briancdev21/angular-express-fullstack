import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shippingaddress',
  templateUrl: './shippingaddress.component.html',
  styleUrls: ['./shippingaddress.component.css']
})
export class ShippingAddressComponent {
  @Input() customerAddress;
  @Input() shippingAddress;

  originshippingaddress = {
    address: '',
    street: '',
    city: '',
    country: '',
    postcode: ''
  };

  onSwitchChanged(status: boolean) {
    if (status) {
      this.shippingAddress = this.customerAddress;
    } else {
      this.shippingAddress = this.originshippingaddress;
    }
  }
}
