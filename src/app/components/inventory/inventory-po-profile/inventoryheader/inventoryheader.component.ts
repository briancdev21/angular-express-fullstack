import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventoryheader',
  templateUrl: './inventoryheader.component.html',
  styleUrls: ['./inventoryheader.component.css']
})
export class InventoryHeaderComponent implements OnInit {
  @Input() createdDate: string;
  @Input() set dueDate(val: string) {
    this._dueDate = val;
  }
  _dueDate: string;
  date_differ: number;

  ngOnInit() {
  }

  calculatorDiffs() {
    const one_day = 1000 * 60 * 60 * 24;
    const date1_ms = new Date().getTime();

    const dueDate_parts = this._dueDate.split('-');
    // tslint:disable-next-line:radix
    const mydate2 = new Date(parseInt(dueDate_parts[0]), parseInt(dueDate_parts[1]) - 1, parseInt(dueDate_parts[2]));
    const date2_ms = mydate2.getTime();
    // Calculate the difference in milliseconds
    const difference_ms = date2_ms - date1_ms;
    this.date_differ = Math.round(difference_ms / one_day);
  }
}
