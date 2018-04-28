import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoicesService } from '../../../../services/invoices.service';

@Component({
  selector: 'app-addinvoice',
  templateUrl: './addinvoice.component.html',
  styleUrls: [
    './addinvoice.component.css',
  ]
})

export class AddInvoiceComponent implements OnInit {

  menuCollapsed = true;

  constructor( private invoicesService: InvoicesService ) {
  }

  ngOnInit() {

  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

}
