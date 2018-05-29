import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';

@Component({
  selector: 'app-po-customer-name',
  templateUrl: './po-customer-name.component.html',
  styleUrls: ['./po-customer-name.component.css']
})

export class POCustomerNameComponent implements OnInit {
  @Input() set userList(_users: any[]) {
    if (_users.length !== 0) {
      _users.forEach((user, index) => {
        this.users.push({'name': user, 'value': index});
      });
      if (this.index !== undefined) {
        this.searchStr = this.users[this.index].name;
      }
    }
  }
  @Input() set contactUser(user: any) {
    if (user !== undefined) {
      console.log('contacted:', user);
      if (typeof user === 'string' || user instanceof String) {
        this.index = parseInt(user.split('-').pop(), 10) - 1;
      } else {
        this.index = user - 1;
      }
      if (this.users.length !== 0) {
        this.searchStr = this.users[this.index].name;
      }
    }
  }
  @Output() selectedUser: EventEmitter<any> = new EventEmitter();
  users = [];
  index: number;
  searchStr: string;
  dataService: CompleterData;


  constructor(private completerService: CompleterService) {
    this.dataService = completerService.local(this.users, 'name', 'name');
  }

  ngOnInit() {

  }

  onSelected(item: CompleterItem) {
    if (item) {
      console.log('value:', item.originalObject);
      this.selectedUser.emit(item.originalObject.value);
    }
  }
}
