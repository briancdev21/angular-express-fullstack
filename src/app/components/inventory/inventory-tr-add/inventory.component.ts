import { Component, OnInit } from '@angular/core';
import {InventoryHeaderComponent} from './inventoryheader/inventoryheader.component';
import { TransferCreateModel } from '../../../models/transfercreate.model';
import { TransferModel } from '../../../models/transfer.model';
import { SharedService } from '../../../services/shared.service';
@Component({
  selector: 'app-inventory-tr-add',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryTrAddComponent implements OnInit {
  tr_mock: TransferModel;
  constructor(private sharedService: SharedService) {
    // constructor
    const tr_create_mock = new TransferCreateModel();
    this.sharedService.createTransfer(tr_create_mock).subscribe(tr_res => {
      this.tr_mock = tr_res.data;
    });
  }

  ngOnInit() {
    // OnInit LifeCycle
  }
}
