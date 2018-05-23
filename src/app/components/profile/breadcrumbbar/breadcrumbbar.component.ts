import { Component, Input, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumbbar',
  templateUrl: './breadcrumbbar.component.html',
  styleUrls: [
    './breadcrumbbar.component.css'
  ]
})
export class BreadcrumbBarComponent implements AfterViewInit {
  @Input() set userInfo(val) {
    this._userInfo = val;
    this.init();
  }
  @Input() keywords;
  autocompleterLoaded = false;
  editable: boolean;
  _userInfo: any;
  newKeyword: string;
  selectedItem: any;
  inputChanged: any = '';
  public data = ['contact', ''];
  items2: any[] = [
    {id: 0, label: 'Michael', imageUrl: 'assets/users/user1.png'},
    {id: 1, label: 'Joseph', imageUrl: 'assets/users/user2.png'},
    {id: 2, label: 'Danny', imageUrl: 'assets/users/user1.png'},
    {id: 3, label: 'John', imageUrl: 'assets/users/user3.png'},
  ];
  list = ['hiello', 'world', 'this'];
  config2: any = {'placeholder': 'Type here', 'sourceField': 'label'};
  isAutocompleteUpdated = false;

  constructor() {
    const comp = this;
    document.addEventListener('click', function() {
      comp.editable = false;
    });
  }

  init() {
      this.editable = false;
      this._userInfo.followers.forEach(element => {
        this.items2 = this.items2.filter(function( obj ) {
          return obj.label !== element.name;
        });
      });
      console.log('followers:', this.items2);
      // input breadcrumb bar info
      this.data = ['contact', this._userInfo.name];
  }

  onSelect(item: any) {
    this.selectedItem = item;
    this.items2 = this.items2.filter(function( obj ) {
      return obj.label !== item.label;
    });
    this._userInfo.followers.push({name: item.label, imageUrl: item.imageUrl });
  }


  onInputChangedEvent(val: string) {
    this.inputChanged = val;
  }

  addUser() {
    // Click 'Add User' Button
  }

  editUser() {
    // Click 'Edit User' Button
  }

  removeUser(i: number) {
    const item = this._userInfo.followers[i];
    this.items2.push({id: this.items2.length, label: item.name, imageUrl: item.imageUrl});
    this._userInfo.followers.splice(i, 1);
    this.isAutocompleteUpdated = !this.isAutocompleteUpdated;
  }

  ngAfterViewInit() {
    this.autocompleterLoaded = true;
  }
}
