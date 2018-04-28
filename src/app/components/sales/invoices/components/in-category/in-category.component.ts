import {Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation} from '@angular/core';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';
@Component({
  selector: 'app-in-category',
  templateUrl: './in-category.component.html',
  styleUrls: ['./in-category.component.css']
})
export class InCategoryComponent implements OnInit {

  @Input() categoryList;
  @Output() selectedUser: EventEmitter<any> = new EventEmitter();
  users = [];

  private searchStr: string;
  private dataService: CompleterData;


  constructor(private completerService: CompleterService) {
    this.dataService = completerService.local(this.users, 'name', 'name');
  }

  ngOnInit() {
    this.categoryList
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
