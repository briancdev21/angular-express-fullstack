import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shippingaddress',
  templateUrl: './shippingaddress.component.html',
  styleUrls: ['./shippingaddress.component.css']
})
export class ShippingAddressComponent {
  @Input() set customerAddress(contactUserAddress: any) {
    this._customerAddress = contactUserAddress;
    this.shippingAddress = this.originshippingaddress;
    console.log('_customerAddress', this._customerAddress);
  }
  @Output() shippingAddressChange: EventEmitter<any> = new EventEmitter();
  shippingAddress: any = {};
  _customerAddress: any = {};

  originshippingaddress = {
    address: '',
    city: '',
    country: '',
    province: '',
    postalCode: ''
  };

  onSwitchChanged(status: boolean) {
    if (status) {
      this.shippingAddress = this._customerAddress;
    } else {
      this.shippingAddress = this.originshippingaddress;
    }
    this.shippingAddressChange.emit(this.shippingAddress);
  }

  onAddressChanged (key, event) {
    this.shippingAddress[key] = event.target.value;
    this.shippingAddressChange.emit(this.shippingAddress);
  }
}
