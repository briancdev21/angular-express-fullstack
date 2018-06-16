import { Component, OnInit } from '@angular/core';
import {InventoryHeaderComponent} from './inventoryheader/inventoryheader.component';
import { SharedService } from '../../../services/shared.service';
import { AdjustmentModel } from '../../../models/adjustment.model';
import { AdjustmentCreateModel } from '../../../models/adjustmentcreate.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-inventory-ad-add',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryAdProfileComponent implements OnInit {
  ad_mock: AdjustmentModel;
  mock_id: number;
  constructor(private sharedService: SharedService, private route: ActivatedRoute) {
    this.route.params.subscribe( params => {
      this.mock_id = params.id;
      const ad_create_mock = new AdjustmentCreateModel();
      this.sharedService.getInventoryAdjustment(this.mock_id).subscribe(tr_res => {
        this.ad_mock = tr_res.data;
      });
    });
  }

  ngOnInit() {
    // OnInit LifeCycle
  }
}
