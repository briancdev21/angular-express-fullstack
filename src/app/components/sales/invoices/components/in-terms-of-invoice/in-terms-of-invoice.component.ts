import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-in-terms-of-invoice',
  templateUrl: './in-terms-of-invoice.component.html',
  styleUrls: ['./in-terms-of-invoice.component.css']
})
export class InTermsOfInvoiceComponent {
  @Input() termsOfInvoice;
  @Input() title;
}
