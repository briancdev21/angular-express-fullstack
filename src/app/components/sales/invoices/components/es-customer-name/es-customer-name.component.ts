import {Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation} from '@angular/core';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';

@Component({
  selector: 'app-es-customer-name',
  templateUrl: './es-customer-name.component.html',
  styleUrls: ['./es-customer-name.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class EsCustomerNameComponent implements OnInit {
  _userList: string[] = [];

  @Input() set userList(val: string[]) {
    this._userList = val;
    this._userList.forEach((user, index) => {
      this.users.push({
        name: user['name'],
        value: user['id'],
        contactType: user['contactType']
      });
    });
  }

  @Input() searchStr;
  @Output() selectedUser: EventEmitter<any> = new EventEmitter();
  users = [];

  dataService: CompleterData;


  constructor(private completerService: CompleterService) {
    this.dataService = completerService.local(this.users, 'name', 'name');
  }

  ngOnInit() {
  }

  onSelected(item: CompleterItem) {
    if (item) {
      this.selectedUser.emit(item.originalObject);
    }
  }

}
