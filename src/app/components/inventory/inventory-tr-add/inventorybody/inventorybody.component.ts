import { Component, OnInit, Input } from '@angular/core';
import { ProductDetailInfo } from '../../../../models/ProductDetailInfo.model';

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
  subtotalproducts = 199.00;
  discountType = 'percent';
  discountAmount = undefined;
  freightcosts = undefined;
  taxes = undefined;
  totalamountdue = undefined;
  tr_id = 'TR-8802131';
  selectedToLocation = 'default';
  selectedFromLocation= 'default';

  po_id = 'PO-8802131';
  createdDate: any;

  transferdate: any;
  constructor() {
    this.createdDate = new Date().toJSON().slice(0, 10);
    this.dueDate = new Date().toJSON().slice(0, 10);
    this.transferdate = new Date().toJSON().slice(0, 10);
  }

  onSwitchChanged(status: boolean) {
    console.log('switch status:', status);
  }
  onSelectUser(val: string) {
    console.log('val', val);
  }
  onCustomerSelected(user) {
    console.log(user);
  }

}
