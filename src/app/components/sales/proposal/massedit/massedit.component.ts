import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ProposalService } from '../proposal.service';

@Component({
  selector: 'app-massedit',
  templateUrl: './massedit.component.html',
  styleUrls: [
    './massedit.component.css',
  ]
})

export class MassEditComponent implements OnInit {

  @Input() proposalProductList;
  @Input() proposalSubCategoryList;
  @Input() proposalCategoryList;
  @Output() editedProposalList: EventEmitter<any> = new EventEmitter;

  priceModalCollapsed = true;
  discountModalCollapsed = true;
  categoryModalCollapsed = true;
  subCategoryModalCollapsed = true;
  showPriceModal = false;
  showDiscountModal = false;
  showCategoryModal = false;
  showSubCategoryModal = false;


  showPriceChangeSign = true;
  showDiscountChangeSign = true;
  queryString = '';
  priceAdjustSelected = 'increase';
  discountAdjustSelected = 'increase';
  selectedRows: any;
  discountAmount = '';
  changeCategorySelect= '';
  changeSubCategorySelect = '';
  expanded = false;

  constructor( private proposalService: ProposalService ) {
  }


  ngOnInit() {
    this.onPriceSelectionChange('amountPrice');
    this.onPriceIncreaseSelect('increase');

  }

  onPriceSelectionChange(value) {
    if (value === 'amountPrice') {
      this.showPriceChangeSign = true;
    } else if (value === 'percentPrice') {
      this.showPriceChangeSign = false;
    } else {
      console.log('Invalid Type!');
    }
  }

  onDiscountSelectionChange(value) {
    if (value === 'amountDiscount') {
      this.showDiscountChangeSign = true;
    } else if (value === 'percentDiscount') {
      this.showDiscountChangeSign = false;
    } else {
      console.log('Invalid Type!');
    }
  }

  onPriceIncreaseSelect(selected) {
    console.log('select: ', selected);
  }

  editPrice() {
    this.priceModalCollapsed = false;
    this.showPriceModal = true;
    this.selectedRows = JSON.parse(window.localStorage.getItem('selectedRows'));
  }

  editDiscount() {
    this.discountModalCollapsed = false;
    this.showDiscountModal = true;
    this.selectedRows = JSON.parse(window.localStorage.getItem('selectedRows'));
  }

  editCategory() {
    this.categoryModalCollapsed = false;
    this.showCategoryModal = true;
    this.selectedRows = JSON.parse(window.localStorage.getItem('selectedRows'));
  }

  editSubCategory() {
    this.subCategoryModalCollapsed = false;
    this.showSubCategoryModal = true;
    this.selectedRows = JSON.parse(window.localStorage.getItem('selectedRows'));
  }

  savePriceChange() {
    const amount = +this.queryString;
    this.priceModalCollapsed = true;
    this.showPriceModal = false;
    console.log('selectedRow: ', this.selectedRows);
    const count = this.selectedRows.length;
    for (let i = 0; i <= (count - 1); i++) {
      // find the index among proposal product list
      const selectdRowIndex = this.proposalProductList.filter( p => p.id === this.selectedRows[i])[0].id - 1;
      let unitPrice = this.proposalProductList[selectdRowIndex].unitPrice;
      if (this.showPriceChangeSign) {
        if (this.priceAdjustSelected === 'increase') {
          unitPrice += amount;
        } else {
          unitPrice -= amount;
        }
      } else {
        if (this.priceAdjustSelected === 'increase') {
          unitPrice *= (100 + amount) / 100;
        } else {
          unitPrice *= (100 - amount) / 100;
        }
      }
      this.proposalProductList[selectdRowIndex].unitPrice = unitPrice;
    }
    this.editedProposalList.emit(this.proposalProductList);
  }

  saveDiscountChange() {
    const amount = +this.discountAmount;
    // console.log('discountAmount: ', amount, this.discountAdjustSelected, this.showDiscountChangeSign);
    this.discountModalCollapsed = true;
    this.showDiscountModal = false;
    const count = this.selectedRows.length;
    for (let i = 0; i <= (count - 1); i++) {
      const selectdRowIndex = this.proposalProductList.filter( p => p.id === this.selectedRows[i])[0].id - 1;
      let discount = this.proposalProductList[selectdRowIndex].discount;
      if (this.showDiscountChangeSign) {
        if (this.discountAdjustSelected === 'increase') {
          discount += amount;
        } else {
          discount -= amount;
        }
      } else {
        if (this.discountAdjustSelected === 'increase') {
          discount *= (100 + amount) / 100;
        } else {
          discount *= (100 - amount) / 100;
        }
      }
      this.proposalProductList[selectdRowIndex].discount = discount;
    }
  }

  saveCategoryChange() {
    this.categoryModalCollapsed = true;
    this.showCategoryModal = false;
    const count = this.selectedRows.length;
    for (let i = 0; i <= (count - 1); i++) {
      const selectdRowIndex = this.proposalProductList.filter( p => p.id === this.selectedRows[i])[0].id - 1;
      this.proposalProductList[selectdRowIndex].category = this.changeCategorySelect;
    }
  }

  saveSubCategoryChange() {
    this.subCategoryModalCollapsed = true;
    this.showSubCategoryModal = false;
    const count = this.selectedRows.length;
    for (let i = 0; i <= (count - 1); i++) {
      const selectdRowIndex = this.proposalProductList.filter( p => p.id === this.selectedRows[i])[0].id - 1;
      this.proposalProductList[selectdRowIndex].subcategory = this.changeSubCategorySelect;
    }
  }

  cancelPriceChange() {
    this.priceModalCollapsed = true;
    this.showPriceModal = false;
  }

  cancelDiscountChange() {
    this.discountModalCollapsed = true;
    this.showDiscountModal = false;
  }

  cancelCategoryChange() {
    this.categoryModalCollapsed = true;
    this.showCategoryModal = false;
  }

  cancelSubCategoryChange() {
    this.subCategoryModalCollapsed = true;
    this.showSubCategoryModal = false;
  }

  expandAll() {
    this.expanded = !this.expanded;
    this.proposalService.expandAll(this.expanded);
  }
}
