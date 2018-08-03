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
    const defaultValue = {
      isDefault: true
    };
    const rmaValue = {
      RMA: true
    }
    this.sharedService.getLocationsWithParams(defaultValue).subscribe(res => {
      // console.log('from lcoation:', res.results.pop());
      tr_create_mock.fromLocation = res.results.pop().id;
      this.sharedService.getLocationsWithParams(rmaValue).subscribe(res => {
        // console.log('to lcoation:', res.results.pop().id);
        tr_create_mock.toLocation =  res.results.pop().id;
        console.log('tr mock:', tr_create_mock);
        this.sharedService.createTransfer(tr_create_mock).subscribe(tr_res => {
          this.tr_mock = tr_res.data;
        });
      });
    });

  }

  ngOnInit() {
    // OnInit LifeCycle
  }
}
