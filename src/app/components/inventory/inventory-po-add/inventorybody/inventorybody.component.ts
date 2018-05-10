import { Component, OnInit, Input } from '@angular/core';
import { ProductDetailInfo } from '../../../../models/ProductDetailInfo.model';
import _ from 'lodash';
import { SharedService } from '../../../../services/shared.service';
import { ContactUserModel } from '../../../../models/contactuser.model';

@Component({
  selector: 'app-inventorybody',
  templateUrl: './inventorybody.component.html',
  styleUrls: ['./inventorybody.component.css'],
  providers: [SharedService]
})
export default class InventoryBodyComponent {
  contactList: ContactUserModel[];
  userList = [];
  projects = ['task1', 'task2', 'task3'];
  labelText = 'Use customer address';
  terms = [];
  selectedTerm = undefined;
  dueDate: any;
  locations = [];
  selectedLocation = undefined;
  productDetails = [];
  internalMemo = undefined;
  subtotalproducts = undefined;
  discountType = 'dollar';
  discountAmount = undefined;
  freightcosts = undefined;
  taxes = undefined;
  totalamountdue = undefined;
  po_id = 'PO-8802131';
  createdDate: any;
  origin_taxes = 0;
  taxrate = 0;
  noteToSupplier: any;

  shippingAddress = {
    address: undefined,
    province: undefined,
    city: undefined,
    country: undefined,
    postalCode: undefined
  };
  customerAddress: any = {};

  constructor(private sharedService: SharedService) {
    this.createdDate = new Date().toJSON().slice(0, 10);
    this.dueDate = new Date().toJSON().slice(0, 10);
    // Get contacts
    this.sharedService.getContacts().subscribe(res => {
      console.log('result:', res);
      this.contactList = res;
      this.userList = this.contactList.map((contactUser) => contactUser.owner);
      this.sharedService.getLocations().subscribe(locationRes => {
        this.locations = locationRes.results;
      });
      this.sharedService.getTerms().subscribe(termRes => {
        this.terms = termRes.results;
        console.log(this.terms);
      });
    });
  }

  onSwitchChanged(status: boolean) {
    console.log('switch status:', status);
  }

  onCustomerSelected(user) {
    console.log(user);
  }

  onSelectUser(selectedIndex: number) {
    console.log('selectedContactIndex:', selectedIndex);
    this.customerAddress = this.contactList[selectedIndex].shippingAddress;
    console.log('this selected location:', this.selectedLocation);
  }

  onSelectLocation(selectedLocation: number) {
    console.log('selectedLocationIndex:', selectedLocation);
    this.selectedLocation = selectedLocation;
  }

  onSelectTerm(selectedTerm: number) {
    console.log('selectedTermIndex:', selectedTerm);
    this.selectedTerm = selectedTerm;
  }

  onPriceChanged() {
    this.subtotalproducts = 0;
    this.taxes = 0;
    this.taxrate = 0;
    this.productDetails.forEach( product => {
      let taxrate;
      switch (product.taxrate) {
        case 'GST': taxrate = 5; break;
        case 'PST': taxrate = 7; break;
        case undefined: taxrate = 0; break;
        default: {
          taxrate = parseInt(product.taxrate, 10);
        }
      }
      console.log('tax', taxrate);
      if (product.total !== undefined) {
        this.subtotalproducts += product.total;
        if (taxrate !== 0) { this.taxes += product.total * taxrate / 100; this.taxrate = taxrate; }
        this.subtotalproducts = Math.round(this.subtotalproducts * 100) / 100 ;
        this.taxes = Math.round(this.taxes * 100) / 100 ;
        this.origin_taxes = this.taxes;
        console.log('taxes:', this.origin_taxes);
      }
    });
    this.onTotalPriceChange(this);

  }

  onTotalPriceChange(data) {
    let freightcosts;
    let discountAmount;
    this.taxes = this.origin_taxes;

    if (data.amount !== undefined) { this.discountAmount = data.amount; }
    if (data.discountType !== this.discountType && data.type) { this.discountType = data.type; }
    if (data.freightcosts !== undefined) { this.freightcosts = data.freightcosts; }
    freightcosts = this.freightcosts;
    discountAmount = this.discountAmount;
    if (freightcosts === undefined) { freightcosts = 0; }
    if (discountAmount === 0) { discountAmount = 0; this.discountAmount  = undefined; }

    if (freightcosts !== undefined && this.subtotalproducts !== undefined) {
      if (discountAmount === undefined) { discountAmount = 0; }
      console.log('totla price discountAmount change', discountAmount);

      switch (this.discountType) {
        case 'percent': {
          console.log('taxes', this.taxes);
          this.taxes = this.taxes * (1 - discountAmount / 100);
          this.totalamountdue = this.subtotalproducts * (100 - discountAmount) / 100 + freightcosts + this.taxes;
        }
        break;
        case 'dollar': {
          this.taxes -= discountAmount * this.taxrate / 100;
          this.totalamountdue = this.subtotalproducts - discountAmount + freightcosts + this.taxes;
        }
        break;
      }
      this.totalamountdue =  Math.round(this.totalamountdue * 100) / 100;
    }
  }
}
