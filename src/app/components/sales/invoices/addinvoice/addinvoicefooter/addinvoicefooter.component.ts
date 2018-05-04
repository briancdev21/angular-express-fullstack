import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addinvoicefooter',
  templateUrl: './addinvoicefooter.component.html',
  styleUrls: ['./addinvoicefooter.component.css']
})
export default class AddInvoiceFooterComponent {

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

  constructor(private router: Router) {

  }

  cancelInvoice() {
    this.router.navigate(['./sales/invoices']);
  }

  saveInvoice() {
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
