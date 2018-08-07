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
      this.users = _users;
      this.dataService = this.completerService.local(this.users, 'name', 'name');

      console.log('userlist:', this.users);
      const user = this.index;
      if (typeof user === 'string') {
        const selectedContactInfo = this.users.filter(userInfo => userInfo.id.toString() === user.split('-').pop()).pop();
        // console.log('selected Contact Info: ', selectedContactInfo);
        this.index = selectedContactInfo['index'];
      }
      if (this.index !== undefined) {
        this.searchStr = this.users[this.index].name;
      }
    }
  }
  @Input() set contactUser(user: any) {
    if (user !== undefined) {
      console.log('contacted:', user);
      if (typeof user === 'string' && this.users.length !== 0 || user instanceof String && this.users.length !== 0) {
        const selectedContactInfo = this.users.filter(userInfo => userInfo.id.toString() === user.split('-').pop()).pop();
        // console.log('selected Contact Info: ', selectedContactInfo);
        this.index = selectedContactInfo['index'];
      } else {
        this.index = user;
      }
      if (this.users.length !== 0) {
        this.searchStr = this.users[this.index].name;
        console.log('search str', this.searchStr);
      }
    }
  }
  @Output() selectedUser: EventEmitter<any> = new EventEmitter();
  users = [];
  index: any;
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
