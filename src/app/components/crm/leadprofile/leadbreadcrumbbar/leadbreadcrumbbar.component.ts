import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../../services/shared.service';
import { CrmService } from '../../../../services/crm.service';

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

  constructor(private sharedService: SharedService, private crmService: CrmService) {

    const comp = this;
    document.addEventListener('click', function() {
      comp.editable = false;
    });
  }

  init() {
    this.editable = false;
    const fData = [];
    this.sharedService.getUsers().subscribe(res => {
      this.usersList = res;
      this.items2 = res;
      this.items2.forEach( element => {
        element.label = element.username;
      });
      this._userInfo.followers.forEach(element => {
        fData.push(this.items2.filter(u => u.username === element)[0]);
      });
      console.log('fdata: ', fData);
      // fData.forEach(d => {
      //   d.name = d.label;
      // });
      this._userInfo.followers = fData;
      this._userInfo.followers.forEach(element => {
        this.items2 = this.items2.filter(i => i.username !== element.username);
      });
      console.log('userInfo ###:', this.items2);
    });


    // input breadcrumb bar info
    if (this._userInfo.name) {
      this.data = ['Leads', this._userInfo.name];
    }
  }

  onSelect(item: any) {
    this.selectedItem = item;
    this.items2 = this.items2.filter(function( obj ) {
      return obj.username !== item.username;
    });
    this._userInfo.followers.push(item);
    console.log('followers: ', this._userInfo);
    this.updateFollowers();
  }

  updateFollowers() {
    let savingData;
    if (this._userInfo.type === 'PERSON') {
      savingData = {
        type: this._userInfo.type,
        currencyId: this._userInfo.currencyId,
        termId: this._userInfo.termId,
        pricingCategoryId: this._userInfo.pricingCategoryId,
        shippingAddress: this._userInfo.shippingAddress,
        email: this._userInfo.email,
        phoneNumbers: this._userInfo.phoneNumbers,
        followers: this._userInfo.followers.map(f => f.username),
        person: {
          firstName: this._userInfo.person.firstName,
          lastName: this._userInfo.person.lastName,
        }
      };
    } else {
      savingData = {
        type: this._userInfo.type,
        currencyId: this._userInfo.currencyId,
        termId: this._userInfo.termId,
        pricingCategoryId: this._userInfo.pricingCategoryId,
        shippingAddress: this._userInfo.shippingAddress,
        email: this._userInfo.email,
        phoneNumbers: this._userInfo.phoneNumbers,
        followers: this._userInfo.followers.map(f => f.username),
        business: {
          name: this._userInfo.business.name
        }
      };
    }
    if (!this._userInfo.phoneNumbers.secondary) {
      delete(this._userInfo.phoneNumbers.secondary);
    }
    this.crmService.updateIndividualLead(this._userInfo.id, savingData).subscribe(res => {
      console.log('lead update: ', res);
    });
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
    this.items2.push(item);
    this._userInfo.followers.splice(i, 1);
    this.updateFollowers();
    this.isAutocompleteUpdated = !this.isAutocompleteUpdated;
  }

  ngAfterViewInit() {
    this.autocompleterLoaded = true;
  }
}
