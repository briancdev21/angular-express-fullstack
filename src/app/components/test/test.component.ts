import { Component } from '@angular/core';
import { CommonComponent } from '../common/common.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: [
    './test.component.css'
  ]
})
export class TestComponent {
  menuCollapsed = true;

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }
}

