import { Component, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FilterService } from '../../filter.service';
import { EstimatesService } from '../../../../../services/estimates.service';

@Component({
  selector: 'app-addestimatefooter',
  templateUrl: './addestimatefooter.component.html',
  styleUrls: ['./addestimatefooter.component.css']
})
export class AddEstimateFooterComponent {

  settingsCollapsed = true;
  showReminderModal = false;
  chargeSwitchOn = false;
  reminderSwitchOn = false;
  recurringSwitchOn = false;
  creditSwitchOn = false;
  switchOn = false;
  frequency: any;
  max_frequency: any;
  selectItem: any;
  logNumber: any;
  noteToSupplier: any;
  currency = 'CAD';
  language = 'ENG';
  showButtons = false;
  showPrintOptions = false;
  printOptions = {
   brand: false,
   qty: false,
   supplier: false,
   totalprice: false
  };
  @Input() createdInvoice;
  showEndBy = false;
  showEndAfter = false;
  startDate: any;
  endDate: any;

  chargeFeeUnit: string;
  chargeFeeValue: number;

    constructor(private router: Router, private filterService: FilterService, private estimatesService: EstimatesService) {

    }

  cancelInvoice() {
    this.router.navigate(['./sales/invoices']);
  }

  saveInvoice() {
    const chargeFeeData = {
      chargeFee: this.chargeSwitchOn,
      unit: this.chargeFeeUnit,
      value: this.chargeFeeValue
    };

      this.filterService.chargeFeeData.next(chargeFeeData);
      this.filterService.saveClicked.next( true );
    }

  onSwitchChanged(val) {

  }

  onEndTypeSelectionChange(value) {
    if (value === 'endBy') {
      this.showEndBy = true;
      this.showEndAfter = false;
    } else {
      this.showEndBy = false;
      this.showEndAfter = true;
    }
  }
}
