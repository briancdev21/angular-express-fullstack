import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FilterService } from '../../filter.service';
import { InvoicesService } from '../../../../../services/invoices.service';

@Component({
  selector: 'app-invoiceprofilefooter',
  templateUrl: './invoiceprofilefooter.component.html',
  styleUrls: ['./invoiceprofilefooter.component.css']
})
export class InvoiceProfileFooterComponent implements OnInit {

  @Input() set createdInvoice(_createdInvoice) {
  }

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
  currentInvoiceId: number;
  reminderSwitchOn = false;
  recurringSwitchOn = false;
  creditSwitchOn = false;
  switchOn = false;
  frequency = 'Daily';
  maxFrequency: any;
  showRecurringModal = false;
  template: any;
  Interval = '';

  constructor(
    private router: Router,
    private filterService: FilterService,
    private invoicesService: InvoicesService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    console.log('created invoice: ', this.createdInvoice);
    // this.chargeFeeUnit = this.createdInvoice.
    this.currentInvoiceId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.invoicesService.getIndividualInvoice(this.currentInvoiceId).subscribe(res => {
      this.chargeFeeUnit = res.data.lateFee.unit;
      this.chargeFeeValue = res.data.lateFee.value;
      this.chargeSwitchOn = res.data.chargeLateFee;
    });
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

  deleteInvoice() {
    this.filterService.deleteClicked.next( true );
  }
}
