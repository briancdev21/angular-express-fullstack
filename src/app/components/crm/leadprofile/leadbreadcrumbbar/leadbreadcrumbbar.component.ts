import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../../services/shared.service';

@Component({
  selector: 'app-leadbreadcrumbbar',
  templateUrl: './leadbreadcrumbbar.component.html',
  styleUrls: [
    './leadbreadcrumbbar.component.css'
  ]
})
export class LeadBreadcrumbBarComponent implements AfterViewInit {
  @Input() set userInfo(val) {
    if (val.followers !== undefined) {
      this._userInfo = val;
      this.init();
    }
  }
  @Input() keywords;
  @Output() getFollowersUpdates = new EventEmitter;
  autocompleterLoaded = false;
  editable: boolean;
  _userInfo: any = {
    name: '',
    followers: []
  };
  newKeyword: string;
  selectedItem: any;
  inputChanged: any = '';
  public data = ['Leads', ''];
  public link = '/crm/leads';
  items2: any[] = [
  ];
  config2: any = {'placeholder': 'Type here', 'sourceField': 'label'};
  isAutocompleteUpdated = false;
  usersList: any;

  constructor(private sharedService: SharedService) {
    this.sharedService.getUsers().subscribe(res => {
      this.usersList = res;
      res.forEach((element, index) => {
        this.items2.push({
          id: index,
          label: element.username,
          imageUrl: element.pictureURI
        });
      });
    });
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

    // input breadcrumb bar info
    if (this._userInfo.name) {
      this.data = ['Leads', this._userInfo.name];
    }
  }

  onSelect(item: any) {
    this.selectedItem = item;
    this.items2 = this.items2.filter(function( obj ) {
      return obj.label !== item.label;
    });
    this._userInfo.followers.push({name: item.label, imageUrl: item.imageUrl });
    console.log('followers: ', this._userInfo.followers);
    this.getFollowersUpdates.emit(this._userInfo.followers);
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
