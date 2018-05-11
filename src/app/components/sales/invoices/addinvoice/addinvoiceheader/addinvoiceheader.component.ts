import { Component, HostListener, Input, OnInit } from '@angular/core';
import { InvoicesService } from '../../../../../services/invoices.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addinvoiceheader',
  templateUrl: './addinvoiceheader.component.html',
  styleUrls: ['./addinvoiceheader.component.css']
})
export class AddInvoiceHeaderComponent implements OnInit {
  @Input() createdDate: string;
  @Input() dueDate: string;
  date_differ: number;

  status = '';
  invoiceId: Number;
  constructor(private invoiceService: InvoicesService, private route: ActivatedRoute ) {

  }
  ngOnInit() {
    // this.status = this.route.snapshot.paramMap.get('title');
    this.invoiceId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.invoiceService.getIndividualInvoice(this.invoiceId).subscribe(res => {
      this.status = res.data.status;
    });
  }
}
