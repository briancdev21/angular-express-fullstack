import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PmService } from '../pm.service';

@Component({
  selector: 'app-pmfinancials',
  templateUrl: './pmfinancials.component.html',
  styleUrls: [
    './pmfinancials.component.css',
  ]
})

export class PmFinancialsComponent implements OnInit {

  constructor( private pmService: PmService ) {
  }

  ngOnInit() {

  }

}
