import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-ordersettings',
  templateUrl: './ordersettings.component.html',
  styleUrls: [
    './ordersettings.component.css'
  ]
})
export class OrderSettingsComponent {
  @Input() set orderProfileInfo (val) {
    this.switchOn = val.isBillable;
  }

  settingsCollapsed = true;
  showReminderModal = false;
  switchOn = false;
  reminderTime = false;

  constructor(private router: Router, private orderService: OrderService) {
  }

  onClickBillable() {
    this.switchOn = !this.switchOn;
  }

  saveWorkOrder() {
    // this.router.navigate(['../collaboration/work-order']);
    const sendSaveDataToDetails = {
      isBillable: this.switchOn,
      saveClicked: true
    };
    this.orderService.saveWorkOrder.next({sendSaveDataToDetails});
  }

  cancelWorkOrder() {
    this.router.navigate(['../collaboration/work-order']);
  }
}
