import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-variantslisttable',
  templateUrl: './variantslisttable.component.html',
  styleUrls: [
    './variantslisttable.component.css',
  ],
  providers: [],
})


export class VariantsListTableComponent implements OnInit {

  @Input() productVariants;
  sortClicked = false;
  constructor( private router: Router ) {
  }

  ngOnInit() {
  }

  getStockColor(stock, reorderPoint) {
    if (stock < reorderPoint) {
      return 'red';
    } else if (stock < reorderPoint + 3) {
      return 'orange';
    } else {
      return 'green';
    }
  }

  sortArray(field) {
    const cmp = this;
    cmp.sortClicked = ! cmp.sortClicked;
    if (!cmp.sortClicked) {
      this.productVariants.sort( function(name1, name2) {
        if ( name1[field] < name2[field] ) {
          return -1;
        } else if ( name1[field] > name2[field]) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.productVariants.reverse();
    }
  }


}

