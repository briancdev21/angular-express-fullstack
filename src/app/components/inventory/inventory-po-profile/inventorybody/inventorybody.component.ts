import { Component, OnInit, Input } from '@angular/core';
import { ProductDetailInfo } from '../../../../models/ProductDetailInfo.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventorybody',
  templateUrl: './inventorybody.component.html',
  styleUrls: ['./inventorybody.component.css']
})
export class InventoryBodyComponent {
  userList = ['John', 'Smith', 'jackie'];
  projects = ['task1', 'task2', 'task3'];
  labelText = 'Use customer address';
  shippingAddress = {
    address: '',
    street: '',
    city: '',
    country: '',
    postcode: ''
  };
  customerAddress =  {
    address: '301,1615 10th Ave SW',
    street: 'Calgary',
    city: 'Alberta',
    country: 'Canada',
    postcode: 'T3C 0J7'
  };

  terms = ['term1', 'term2', 'term3'];
  selectedTerm = '';
  dueDate: any;

  locations = ['locations1', 'locations2', 'locations3'];
  selectedLocation = '';
  productDetails = [];
  internalMemo = undefined;
  subtotalproducts = undefined;
  discountType = 'percent';
  discountAmount = undefined;
  freightcosts = undefined;
  taxes = undefined;
  totalamountdue = undefined;
  taxrate = 0;
  origin_taxes = undefined;

  po_id = 'PO-8802131';
  createdDate: any;
  noteToSupplier: any;

  // footer
  currency = 'CAD';
  language = 'ENG';
  showButtons = false;
  showSendPOModal = false;
  showCancelPOModal = false;
  showPrintOptions = false;
  printOptions = {
   brand: false,
   qty: false,
   supplier: false,
   totalprice: false
  };

  constructor(private router: Router) {
    this.createdDate = new Date().toJSON().slice(0, 10);
    this.dueDate = new Date().toJSON().slice(0, 10);

  }
  onCustomerSelected(user) {
    console.log(user);
  }
  onSelectUser(val: string) {
    console.log('val', val);
  }
  onSwitchChanged(status: boolean) {
    console.log('switch status:', status);
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
    this.showCancelPOModal = true;
  }

  deletePO() {
    // this.sharedService.deletePurchaseOrder(this.po_mock.id).subscribe(() => {
      this.router.navigate(['./inventory/stock-control']);
    // });
  }

  onSave() {
    // if (this.po_mock.term !== undefined
    //   && this.contactId !== undefined
    //   && this.po_mock.location !== undefined
    //   && this.po_mock.supplierNote
    //   && this.po_mock.internalMemo) {
      this.showSendPOModal = true;
    // }
  }

  savePO() {
    this.router.navigate(['./inventory/stock-control']);
  }
}
