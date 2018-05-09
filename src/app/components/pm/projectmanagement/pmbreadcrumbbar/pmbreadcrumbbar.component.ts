import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-pmbreadcrumbbar',
  templateUrl: './pmbreadcrumbbar.component.html',
  styleUrls: [
    './pmbreadcrumbbar.component.css'
  ]
})
export class PmBreadcrumbBarComponent implements OnInit {
  @Input() userInfo;
  @Input() keywords;
  editable: boolean;
  newKeyword: string;
  selectedItem: any = '';
  inputChanged: any = '';
  data = ['Projects', 'Remodel with a Nu life'];
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
    this.userInfo.followers.forEach(element => {
      this.items2 = this.items2.filter(function( obj ) {
        return obj.payload.label !== element.name;
      });
    });
  }

  onSelect(item: any) {
    this.selectedItem = item;
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

  tabChange(event) {
    console.log('event: ', event);
  }
}
