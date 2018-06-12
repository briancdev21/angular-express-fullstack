import { Component, OnInit } from '@angular/core';
import {InventoryHeaderComponent} from './inventoryheader/inventoryheader.component';
import { TransferCreateModel } from '../../../models/transfercreate.model';
import { TransferModel } from '../../../models/transfer.model';
import { SharedService } from '../../../services/shared.service';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-inventory-tr-add',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryTrProfileComponent implements OnInit {
  tr_mock: TransferModel;
  mock_id: number;
  constructor(private sharedService: SharedService, private route: ActivatedRoute) {
    this.route.params.subscribe( params => {
      this.mock_id = params.id;
      const tr_create_mock = new TransferCreateModel();
      this.sharedService.getTransfer(this.mock_id).subscribe(tr_res => {
        this.tr_mock = tr_res.data;
      });
    });
  }

  ngOnInit() {
    // OnInit LifeCycle
  }
}
