import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-inventoryfooter',
  templateUrl: './inventoryfooter.component.html',
  styleUrls: ['./inventoryfooter.component.css']
})
export class InventoryFooterComponent {
  currency = "CAD";
  language = "ENG";
  showButtons = false;
  showPrintOptions = false;
  printOptions = {
   brand: false,
   qty: false,
   supplier: false,
   totalprice: false 
  };

  onCancel() {

  }

  onSave() {

  }
  onSwitchChanged(val) {

  }
}
