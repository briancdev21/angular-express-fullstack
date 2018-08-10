import { Component, HostListener, Input, OnInit } from '@angular/core';
import { InvoicesService } from '../../../../../services/invoices.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoiceprofileheader',
  templateUrl: './invoiceprofileheader.component.html',
  styleUrls: ['./invoiceprofileheader.component.css']
})
export class InvoiceProfileHeaderComponent implements OnInit {

  status = '';
  invoiceId: string;
  constructor(private invoiceService: InvoicesService, private route: ActivatedRoute ) {

  }
  ngOnInit() {
    // this.status = this.route.snapshot.paramMap.get('title');
    this.invoiceId = this.route.snapshot.paramMap.get('id');
    this.invoiceService.getIndividualInvoice(this.invoiceId).subscribe(res => {
      this.status = res.data.status;
    });
  }
}
