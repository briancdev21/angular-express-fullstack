import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shippingaddress',
  templateUrl: './shippingaddress.component.html',
  styleUrls: ['./shippingaddress.component.css']
})
export class ShippingAddressComponent {
  @Input() set customerAddress(contactUserAddress: any) {
    console.log('customer address cahnged:', contactUserAddress);
    this._customerAddress = contactUserAddress;
    if (this.switchStatus) {
      this.shippingAddress = this._customerAddress;
      this.shippingAddressChange.emit(this.shippingAddress);
    }
  }

  @Input() set addressFromLocation(addressFromLocation: any) {
    this.originshippingaddress = addressFromLocation;
    if (!this.switchStatus) {
      this.shippingAddress = this.originshippingaddress;
      this.shippingAddressChange.emit(this.shippingAddress);
    }
  }

  @Output() shippingAddressChange: EventEmitter<any> = new EventEmitter();
  shippingAddress: any = {};
  _customerAddress: any = {};
  switchStatus = false;

  originshippingaddress: any = {};

  onSwitchChanged(status: boolean) {
    console.log('switch status:', status);
    this.switchStatus = status;
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
