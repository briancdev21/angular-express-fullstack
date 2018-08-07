import { Component, OnInit } from '@angular/core';
import {InventoryHeaderComponent} from './inventoryheader/inventoryheader.component';
import { PurchaseOrderModel } from '../../../models/purchaseorder.model';
import { SharedService } from '../../../services/shared.service';
import { PurchaseOrderCreateModel } from '../../../models/purchaseordercreate.model';
import { DateAdapter } from '@angular/material';
import * as _ from 'lodash';
import { EmptyShippingAddressModel } from '../../../models/emptyShippingAddress.model';
@Component({
  selector: 'app-inventory-po-add',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  providers: [SharedService]

})
export class InventoryPoAddComponent implements OnInit {

  po_mock: any = {
    status: '',
    contactId: undefined,
    shippingAddress: {
      address: '',
      city: '',
      province: '',
      postalCode: '',
      country: ''
    },
    location: undefined,
    term: undefined,
    freightCost: undefined,
    dueDate: '',
    discount: {
      value: undefined,
      unit: '',
    },
    internalMemo: '',
    supplierNote: '',
  };

  constructor(private sharedService: SharedService) {
    // constructor
    const po_create_mock = new PurchaseOrderCreateModel();
    const promises = [];
    const mockCreateData = {
      freightCost: 0,
      internalMemo: '',
      supplierNote: '',
      dueDate: new Date().toJSON().slice(0, 10)
    };

    this.sharedService.getTerms().subscribe(terms => {
      po_create_mock.term = terms.results[0].id;
      const params = {
        isDefault: true
      }
      this.sharedService.getLocationsWithParams(params).subscribe(locations => {
        po_create_mock.locationId = locations.results[0].id;
        this.sharedService.getContacts().subscribe(contacts => {
          contacts = this.addContactName(contacts);
          po_create_mock.contactId = contacts[0].id;
          _.assign(po_create_mock, mockCreateData);
          this.sharedService.createPurchaseOrder(po_create_mock).subscribe(po_res => {
            this.po_mock = po_create_mock;
            this.po_mock.id = po_res.data.id;
            this.po_mock.status = po_res.data.status;
            this.po_mock.shippingAddress = new EmptyShippingAddressModel();
          });
        });
      });
    });
  }

  ngOnInit() {
    // OnInit LifeCycle
  }
  addContactName(data) {
    data.forEach(element => {
      if (element.type === 'PERSON') {
        element.name = element.person.firstName + ' ' + element.person.lastName;
      } else {
        element.name = element.business.name;
      }
    });
    return data;
  }
}
