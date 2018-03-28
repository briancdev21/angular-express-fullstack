import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PmService } from '../pm.service';

@Component({
  selector: 'app-pmboard',
  templateUrl: './pmboard.component.html',
  styleUrls: [
    './pmboard.component.css',
  ]
})

export class PmBoardComponent implements OnInit {

  menuCollapsed: any;
  constructor( private pmService: PmService ) {
  }

  ngOnInit() {

  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }
}
