import { Component, Input, OnInit, HostListener, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MultiKeywordSelectComponent } from '../../../profile/multikeywordselect/multikeywordselect.component';
import { CompleterService, CompleterData } from 'ng2-completer';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: [
    './addproduct.component.css',
  ]
})


export class AddProductComponent implements OnInit {
  @ViewChild('tabsRef', {read: ElementRef}) tabsRef: ElementRef;
  @Input() productsListInfo;
  @Input() productTags;
  @Input() productStatus;
  @Output() addToProductsList: EventEmitter<any> = new EventEmitter;
  protected searchStr: string;
  protected captain: string;
  protected captainSource: string;
  protected dataService: CompleterData;
  protected searchData = [
    { color: 'red', value: '#f00' },
    { color: 'green', value: '#0f0' },
    { color: 'blue', value: '#00f' },
    { color: 'cyan', value: '#0ff' },
    { color: 'magenta', value: '#f0f' },
    { color: 'yellow', value: '#ff0' },
    { color: 'black', value: '#000' }
  ];
  protected captains = ['Head Product', 'Accounts Receivable'];
  protected captainsSource = ['Product referal'];

  addProductModalCollapsed = true;
  showAddProductModal = false;
  switchIconShipping: boolean = true;
  shippingAddress: string = '';
  typeAccountTypeChange = false;
  keywords: any;
  productAssociation: any;
  businessType: any;
  tabActiveFirst = true;
  tabActiveSecond = false;
  invalidFirstname = false;
  invalidLastname = false;
  invalidBusinessName = false;
  invalidAccountType = false;
  firstName = '';
  lastName = '';
  businessName = '';
  defaultTerm = '';
  defaultCurrency = '';
  defaultPricing = '';
  primaryNumber = '';
  invalidDefaultTerm = false;
  invalidDefaultCurrency = false;
  invalidDefaultPricing = false;
  invalidPrimaryNumber = false;
  sourceValue = true;
  newEmail = '';
  newAddress = '';
  selectTag = '';

  constructor(private completerService: CompleterService) {
    this.dataService = completerService.local(this.searchData, 'color', 'color');
    this.keywords = ['control4', 'theatre', 'renovation'];
    this.productAssociation = ['Danny Shibley', 'John Stephen'];
  }

  ngOnInit() {
  }

  onAccountTypeChange(event) {
    this.invalidFirstname = false;
    this.invalidLastname = false;
    this.invalidBusinessName = false;
    this.invalidAccountType = false;
    this.invalidPrimaryNumber = false;
    if (event === 'individual') {
      this.typeAccountTypeChange = false;
    } else if (event === 'business') {
      this.typeAccountTypeChange = true;
    }
  }

  clickIconShipping() {
    this.switchIconShipping = !this.switchIconShipping;
    this.shippingAddress = (this.switchIconShipping) ? 'test' : '';
  }

  onEnter() {
  }

  checkSource(event) {
    if (this.captainSource === 'Product referal') {
      this.sourceValue = false;
    } else {
      this.sourceValue = true;
    }
  }

  clickNext() {
    this.invalidFirstname = false;
    this.invalidLastname = false;
    this.invalidBusinessName = false;
    this.invalidAccountType = false;
    this.invalidPrimaryNumber = false;
    if (this.businessType === 'individual') {
      if (this.firstName && this.lastName && this.primaryNumber) {
        this.tabActiveFirst = false;
        this.tabActiveSecond = true;
      } else {
        if (!this.firstName) {
          this.invalidFirstname = true;
        }
        if (!this.lastName) {
          this.invalidLastname = true;
        }
        if (!this.primaryNumber) {
          this.invalidPrimaryNumber = true;
        }
      }
    } else if (this.businessType === 'business') {
      if (this.businessName) {
        this.tabActiveFirst = false;
        this.tabActiveSecond = true;
      } else {
        if (!this.businessName) {
          this.invalidBusinessName = true;
        }
        if (!this.primaryNumber) {
          this.invalidPrimaryNumber = true;
        }
      }
    } else {
      this.invalidAccountType = true;
      if (!this.firstName) {
        this.invalidFirstname = true;
      }
      if (!this.lastName) {
        this.invalidLastname = true;
      }
      if (!this.primaryNumber) {
        this.invalidPrimaryNumber = true;
      }
    }
  }

  tabChange(event) {
    switch (event.tabTitle) {
      case 'BASIC INFORMATION': {
        this.tabActiveFirst = true;
        this.tabActiveSecond = false;
        break;
      }
      case 'ADVANCED INFORMATION': {
        this.tabActiveFirst = false;
        this.tabActiveSecond = true;
        this.invalidFirstname = false;
        this.invalidLastname = false;
        this.invalidBusinessName = false;
        this.invalidAccountType = false;
        this.invalidPrimaryNumber = false;

        if (this.businessType === 'individual') {
          if (this.firstName && this.lastName && this.primaryNumber) {
            this.tabActiveFirst = false;
            this.tabActiveSecond = true;
            break;
          } else {
            setTimeout(() => {
              this.tabActiveFirst = true;
              this.tabActiveSecond = false;
            });
            if (!this.firstName) {
              this.invalidFirstname = true;
            }
            if (!this.lastName) {
              this.invalidLastname = true;
            }
            if (!this.primaryNumber) {
              this.invalidPrimaryNumber = true;
            }
          }
        } else if (this.businessType === 'business') {
          if (this.businessName) {
            this.tabActiveFirst = false;
            this.tabActiveSecond = true;
          } else {
            setTimeout(() => {
              this.tabActiveFirst = true;
              this.tabActiveSecond = false;
            });
            if (!this.businessName) {
              this.invalidBusinessName = true;
            }
            if (!this.primaryNumber) {
              this.invalidPrimaryNumber = true;
            }
          }
        } else {
          setTimeout(() => {
            this.tabActiveFirst = true;
            this.tabActiveSecond = false;
          });
          this.invalidAccountType = true;
          if (!this.firstName) {
            this.invalidFirstname = true;
          }
          if (!this.lastName) {
            this.invalidLastname = true;
          }
          if (!this.primaryNumber) {
            this.invalidPrimaryNumber = true;
          }
        }
        break;
      }
    }
  }
  clickSaveProduct() {

    const newProduct = {
      id: this.productsListInfo.length,
      name: this.firstName + ' ' + this.lastName,
      phone: this.primaryNumber,
      email: this.newEmail,
      createDate: new Date(),
      updateDate: new Date(),
      lastProductedDate: new Date(),
      rating: '0',
      address: this.newAddress,
      tag: this.selectTag,
      account: '0',
      association: '0',
      totalDeals: '0',
      accountType: this.businessType,
    };

    this.invalidDefaultTerm = false;
    this.invalidDefaultCurrency = false;
    this.invalidDefaultPricing = false;
    if (this.defaultTerm && this.defaultCurrency && this.defaultPricing) {
      this.addProductModalCollapsed = true;
      this.showAddProductModal = false;
      this.tabActiveFirst = true;
      this.tabActiveSecond = false;
      this.addToProductsList.emit({data: newProduct});
    } else {
      if (!this.defaultCurrency) {
        this.invalidDefaultCurrency = true;
      }
      if (!this.defaultTerm) {
        this.invalidDefaultTerm = true;
      }
      if (!this.defaultPricing) {
        this.invalidDefaultPricing = true;
      }
    }
  }
}
