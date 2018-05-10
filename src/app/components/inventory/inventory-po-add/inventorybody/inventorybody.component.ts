import { Component, OnInit, Input } from '@angular/core';
import { ProductDetailInfo } from '../../../../models/ProductDetailInfo.model';
import _ from 'lodash';
import { SharedService } from '../../../../services/shared.service';
import { ContactUserModel } from '../../../../models/contactuser.model';
import { PurchaseOrderModel } from '../../../../models/purchaseorder.model';
import { PurchaseOrderCreateModel } from '../../../../models/purchaseordercreate.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventorybody',
  templateUrl: './inventorybody.component.html',
  styleUrls: ['./inventorybody.component.css'],
  providers: [SharedService]
})
export default class InventoryBodyComponent {
  
  @Input() set poData(_podata) {
    this.po_mock = _podata;
    if (_podata) {
      this.po_id = `PO-${this.po_mock.id}`;
    }
  };

  // Footer 
  showButtons = false;
  showPrintOptions = false;
  printOptions = {
   brand: false,
   qty: false,
   supplier: false,
   totalprice: false 
  };

  // Main Section
  contactList: ContactUserModel[];
  contactId = undefined;
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
  po_id = '';
  createdDate: any;
  origin_taxes = 0;
  taxrate = 0;
  noteToSupplier: any;

  po_mock: PurchaseOrderModel;
  shippingAddress = {
    address: undefined,
    province: undefined,
    city: undefined,
    country: undefined,
    postalCode: undefined
  };
  customerAddress: any = {};

  constructor(private sharedService: SharedService, private router: Router) {
    this.createdDate = new Date().toISOString();
    this.dueDate = new Date().toISOString();
      // Get contacts
      this.sharedService.getContacts().subscribe(res => {
        console.log('result:', res);
        this.contactList = res;
        this.userList = this.contactList.map((contactUser) => contactUser.owner);
      });
      this.sharedService.getLocations().subscribe(locationRes => {
        this.locations = locationRes.results;
      });
      this.sharedService.getTerms().subscribe(termRes => {
        this.terms = termRes.results;
        console.log(this.terms);
      });
  }

  onSwitchChanged(status: boolean) {
    console.log('switch status:', status);
  }

  onCustomerSelected(user) {
    console.log(user);
  }

  onSelectUser(selectedIndex: string) {
    console.log('selectedContactIndex:', selectedIndex);
    this.customerAddress = this.contactList[selectedIndex].shippingAddress;
    console.log('this selected location:', this.selectedLocation);
    this.contactId = this.contactList[selectedIndex].id;
    this.po_mock.contactId = parseInt(this.contactList[selectedIndex].id);
  }

  onSelectLocation(selectedLocation: string) {
    console.log('selectedLocationIndex:', selectedLocation);
    this.po_mock.location = parseInt(selectedLocation);
  }

  onSelectTerm(selectedTerm: string) {
    console.log('selectedTermIndex:', selectedTerm);
    this.po_mock.term = parseInt(selectedTerm);
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

  onCancel() {
    this.sharedService.deletePurchaseOrder(this.po_mock.id).subscribe(() => {
      this.router.navigate(['./inventory/stock-control']);
    });
  }

  onSave() {
    if (this.po_mock.term != undefined && this.contactId != undefined && this.po_mock.location != undefined) {
      this.sharedService.updatePurchaseOrder(this.po_mock.id, this.po_mock).subscribe(() => {
        this.router.navigate(['./inventory/stock-control']);
      });
    }
  }

  onSupplierSentSwitchChanged(val) {

  }

  onDueDateChanged(event) {
    console.log('duedate:', event);
    this.po_mock.dueDate = event;
  }
}
