import {Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation} from '@angular/core';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';
@Component({
  selector: 'app-in-class',
  templateUrl: './in-class.component.html',
  styleUrls: ['./in-class.component.css']
})
export class InClassComponent implements OnInit {

  @Input() classList;
  @Output() selectedUser: EventEmitter<any> = new EventEmitter();
  users = [];

  private searchStr: string;
  private dataService: CompleterData;


  constructor(private completerService: CompleterService) {
    this.dataService = completerService.local(this.users, 'name', 'name');
  }

  ngOnInit() {
    this.classList
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
