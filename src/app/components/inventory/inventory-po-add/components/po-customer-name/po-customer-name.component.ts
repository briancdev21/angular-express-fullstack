import {Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation} from '@angular/core';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';

@Component({
  selector: 'app-po-customer-name',
  templateUrl: './po-customer-name.component.html',
  styleUrls: ['./po-customer-name.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class POCustomerNameComponent implements OnInit {
  @Input() set userList(_users: any[]) {
    _users.forEach((user, index) => {
        this.users.push({'name': user, 'value': index});
      });
  };

  @Output() selectedUser: EventEmitter<any> = new EventEmitter();
  users = [];

  private searchStr: string;
  dataService: CompleterData;


  constructor(private completerService: CompleterService) {
    this.dataService = completerService.local(this.users, 'name', 'name');
  }

  ngOnInit() {

  }

  onSelected(item: CompleterItem) {
    if (item) {
      console.log('value:', item.originalObject.value);
      this.selectedUser.emit(item.originalObject.value);
    }
  }
}
