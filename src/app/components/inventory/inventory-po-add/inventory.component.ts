import { Component, OnInit } from '@angular/core';
import {InventoryHeaderComponent} from './inventoryheader/inventoryheader.component';
import { PurchaseOrderModel } from '../../../models/purchaseorder.model';
import { SharedService } from '../../../services/shared.service';
import { PurchaseOrderCreateModel } from '../../../models/purchaseordercreate.model';

@Component({
  selector: 'app-inventory-po-add',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  providers: [SharedService]

})
export class InventoryPoAddComponent implements OnInit {

  po_mock: PurchaseOrderModel;

  constructor(private sharedService: SharedService) {
    // constructor
    const po_create_mock = new PurchaseOrderCreateModel();
    this.sharedService.createPurchaseOrder(po_create_mock).subscribe(po_res => {
      this.po_mock = po_res.data;
    });
  }

  ngOnInit() {
    // OnInit LifeCycle
  }
}
