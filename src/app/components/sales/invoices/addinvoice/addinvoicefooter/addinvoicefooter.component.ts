import { Component, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FilterService } from '../../filter.service';
import { InvoicesService } from '../../../../../services/invoices.service';

@Component({
  selector: 'app-addinvoicefooter',
  templateUrl: './addinvoicefooter.component.html',
  styleUrls: ['./addinvoicefooter.component.css']
})
export class AddInvoiceFooterComponent {

  @Input() createdInvoice;

  settingsCollapsed = true;
  showReminderModal = false;
  chargeSwitchOn = false;
  reminderSwitchOn = false;
  recurringSwitchOn = false;
  creditSwitchOn = false;
  switchOn = false;
  frequency: any;
  max_frequency: any;
  showRecurringModal = false;
  template: any;
  interval: any;

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

  constructor(private router: Router, private filterService: FilterService, private invoicesService: InvoicesService) {

  }

  cancelInvoice() {
    const invoiceId = this.createdInvoice.id;
    this.invoicesService.deleteIndividualInvoice(invoiceId).subscribe( res => {
      console.log('invoice deleted');
      this.router.navigate(['./sales/invoices']);
    });
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
