import { Component, HostListener, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FilterService } from '../../filter.service';
import { InvoicesService } from '../../../../../services/invoices.service';
import { EstimatesService } from '../../../../../services/estimates.service';

@Component({
  selector: 'app-estimateprofilefooter',
  templateUrl: './estimateprofilefooter.component.html',
  styleUrls: ['./estimateprofilefooter.component.css']
})
export class EstimateProfileFooterComponent implements OnInit, OnDestroy {

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
  currentEstimateId: any;
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
    private route: ActivatedRoute,
    private estimatesService: EstimatesService) {
  }

  ngOnInit() {
    // this.chargeFeeUnit = this.createdInvoice.
    this.currentEstimateId = this.route.snapshot.paramMap.get('id');
  }

  cancelInvoice() {
    // const invoiceId = this.createdInvoice.id;
    // this.invoicesService.deleteInvoice(invoiceId).subscribe
    this.router.navigate(['./sales/invoices']);
  }

  saveInvoice() {
    const chargeFeeData = {
      chargeFee: undefined,
      unit: undefined,
      value: undefined
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

  ngOnDestroy() {
    this.filterService.deleteClicked.next( false );
    this.filterService.saveClicked.next( false );
  }
}
