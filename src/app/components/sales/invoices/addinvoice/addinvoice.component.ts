import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  status = '';

  constructor( private invoicesService: InvoicesService, private router: Router, private route: ActivatedRoute ) {
  }

  ngOnInit() {

  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

}
