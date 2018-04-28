import {Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation} from '@angular/core';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';

@Component({
  selector: 'app-in-customer-name',
  templateUrl: './in-customer-name.component.html',
  styleUrls: ['./in-customer-name.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class InCustomerNameComponent implements OnInit {
  @Input() userList;
  @Input() searchStr;
  @Output() selectedUser: EventEmitter<any> = new EventEmitter();
  users = [];

  private dataService: CompleterData;


  constructor(private completerService: CompleterService) {
    this.dataService = completerService.local(this.users, 'name', 'name');
  }

  ngOnInit() {
    this.userList
      .forEach((user, index) => {
        this.users.push({'name': user});
      });
  }

  onSelected(item: CompleterItem) {
    if (item) {
      this.selectedUser.emit(item.title);
    }
  }
}
