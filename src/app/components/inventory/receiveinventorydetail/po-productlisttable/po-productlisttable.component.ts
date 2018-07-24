import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';
import { SharedService } from '../../../../services/shared.service';

@Component({
  selector: 'app-po-receive-productlisttable',
  templateUrl: './po-productlisttable.component.html',
  styleUrls: [
    './po-productlisttable.component.css',
  ]
})


export class POProductListTableComponent implements OnInit {
  @Input() productsInfo;
  ngOnInit() {
    
  }
}

