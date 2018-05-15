import { Component, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FilterService } from '../../filter.service';
import { InvoicesService } from '../../../../../services/invoices.service';

@Component({
  selector: 'app-estimateprofilefooter',
  templateUrl: './estimateprofilefooter.component.html',
  styleUrls: ['./estimateprofilefooter.component.css']
})
export default class EstimateProfileFooterComponent {

  @Input() createdInvoice;

  settingsCollapsed = true;
  showReminderModal = false;

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
  showEndBy = false;
  showEndAfter = false;
  startDate: any;
  endDate: any;

  chargeFeeUnit: string;
  chargeFeeValue: number;
  chargeSwitchOn: false;

  constructor(private router: Router, private filterService: FilterService, private invoicesService: InvoicesService) {

  }

  cancelInvoice() {
    // const invoiceId = this.createdInvoice.id;
    // this.invoicesService.deleteInvoice(invoiceId).subscribe
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
    this.router.navigate(['./sales/invoices']);
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
