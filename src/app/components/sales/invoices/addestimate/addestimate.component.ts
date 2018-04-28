import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoicesService } from '../../../../services/invoices.service';

@Component({
  selector: 'app-addestimate',
  templateUrl: './addestimate.component.html',
  styleUrls: [
    './addestimate.component.css',
  ]
})

export class AddEstimateComponent implements OnInit {

  menuCollapsed = true;

  constructor( private invoicesService: InvoicesService ) {
  }

  ngOnInit() {

  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }


}
