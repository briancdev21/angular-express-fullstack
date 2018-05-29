import { Component, OnInit } from '@angular/core';
import {InventoryHeaderComponent} from './inventoryheader/inventoryheader.component';
import { SharedService } from '../../../services/shared.service';
import { AdjustmentModel } from '../../../models/adjustment.model';
import { AdjustmentCreateModel } from '../../../models/adjustmentcreate.model';
@Component({
  selector: 'app-inventory-ad-add',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryAdAddComponent implements OnInit {
  ad_mock: AdjustmentModel;
  constructor(private sharedService: SharedService) {
    // constructor
    const ad_create_mock = new AdjustmentCreateModel();
    this.sharedService.getLocations().subscribe(locationRes => {
      const locations = locationRes.results;
      ad_create_mock.adjustedLocation = locations[0].id;
      ad_create_mock.internalMemo = '';
      this.sharedService.createInventoryAdjustment(ad_create_mock).subscribe(ad_res => {
        this.ad_mock = ad_res.data;
      });
    });

  }

  ngOnInit() {
    // OnInit LifeCycle
  }
}
