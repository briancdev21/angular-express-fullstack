import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumbbar',
  templateUrl: './breadcrumbbar.component.html',
  styleUrls: [
    './breadcrumbbar.component.css'
  ]
})
export class BreadcrumbBarComponent {
  @Input() userInfo;
  @Input() keywords;
  editable: boolean;
  newKeyword: string;
  selectedItem: any = '';
  inputChanged: any = '';

  items2: any[] = [
    {id: 0, payload: {label: 'Michael', imageUrl: 'assets/users/user1.png'}},
    {id: 1, payload: {label: 'Joseph', imageUrl: 'assets/users/user2.png'}},
    {id: 2, payload: {label: 'Danny', imageUrl: 'assets/users/user1.png'}},
    {id: 3, payload: {label: 'John', imageUrl: 'assets/users/user3.png'}},
  ];
  config2: any = {'placeholder': 'Type here', 'sourceField': ['payload', 'label']};

  constructor() {
    const comp = this;
    document.addEventListener('click', function() {
      comp.editable = false;
   });
  }

  ngOnInit() {
    this.editable = false;
    console.log('userinfo:', this.userInfo.followers);
    this.userInfo.followers.forEach(element => {
      console.log('element:', element);
      this.items2 = this.items2.filter(function( obj ) {
        return obj.payload.label !== element.name;
      });
      console.log('items2:', this.items2);
    });
  }

  onSelect(item: any) {
    this.selectedItem = item;
    console.log('item:', item);
    this.items2 = this.items2.filter(function( obj ) {
      return obj.payload.label !== item.payload.label;
    });
    this.userInfo.followers.push({name: item.payload.label, imageUrl: item.payload.imageUrl });
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
    const item = this.userInfo.followers[i];
    this.items2.push({id: this.items2.length, payload: {label: item.name, imageUrl: item.imageUrl}});
    this.userInfo.followers.splice(i, 1);
  }
}
