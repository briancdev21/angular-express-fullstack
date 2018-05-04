import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addestimatefooter',
  templateUrl: './addestimatefooter.component.html',
  styleUrls: ['./addestimatefooter.component.css']
})
export default class AddEstimateFooterComponent {

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
}
