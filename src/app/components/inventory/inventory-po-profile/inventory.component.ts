import { Component, OnInit } from '@angular/core';
import {InventoryHeaderComponent} from './inventoryheader/inventoryheader.component';
import { SharedService } from '../../../services/shared.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inventory-po-profile',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  providers: [SharedService]
})
export class InventoryPoProfileComponent implements OnInit {
  po_mock = {
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
  mock_id: any;
  createdDate: String;
  dueDate: String;

  constructor(private sharedService: SharedService, private route: ActivatedRoute) {
    this.route.params.subscribe( params => {
      this.mock_id = params.purchaseOrderId;
      this.mock_id = 3;
      this.sharedService.getPurchaseOrder(this.mock_id).subscribe(po_res => {
        this.po_mock = po_res.data;
        this.createdDate = new Date().toISOString().slice(0, 10);
        this.dueDate = this.po_mock.dueDate;
      });
    });
  }

  ngOnInit() {
  }
}
