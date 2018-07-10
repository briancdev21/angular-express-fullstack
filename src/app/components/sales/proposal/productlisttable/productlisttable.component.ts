import { Component, Input, OnInit, HostListener, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ProposalService } from '../proposal.service';
import * as moment from 'moment';
import { forEach } from '@angular/router/src/utils/collection';
import { PmTasksService } from '../../../../services/pmtasks.service';
import { ProductsService } from '../../../../services/inventory/products.service';

@Component({
  selector: 'app-productlisttable',
  templateUrl: './productlisttable.component.html',
  styleUrls: [
    './productlisttable.component.css',
  ]
})

export class ProductListTableComponent implements OnInit, OnDestroy {

  @Input() originProposalProductList;
  @Input() proposalInfo;
  @Input() searchQueryString;
  @Input() proposalCategoryList;
  @Input() proposalSubCategoryList;
  @Output() updatedDate: EventEmitter<any> = new EventEmitter;

  productTotal = 0;
  selectedRows = [];
  isShift = false;
  isCtrl = false;
  clicked = false;
  searchableList: any;
  parentNodes = [];
  childNodes = [];
  addedIndex: any;
  deleteModalCollapsed = true;
  isFocus = false;
  expandedSkus = {};
  parents = [];
  childNodesForParents = [];
  proposalProductList = [];
  max = undefined;

  constructor( private proposalService: ProposalService, private productsService: ProductsService) {
    this.productsService.getProductAccessoriesList().subscribe(res => {
      console.log('product list', res.results);
      // product list 
    });
    this.productsService.getProductAlternativesList().subscribe(res => {
      console.log('product list', res.results);
      // product list 
      const alternativesList = res.results;
      listIds = alternativesList.filter(item => item.id);
    });
    this.productsService.getProductList().subscribe(res => {
      console.log('product list', res.results);
    });
  }

  ngOnDestroy() {
    localStorage.removeItem('originProposalProductList');
  }

  ngOnInit() {
    this.proposalProductList = this.originProposalProductList;
    this.proposalService.tableExpanded.subscribe(
      data => {
        this.proposalProductList.map(product => product.expanded = false);
        this.parents = this.getParentNode(this.proposalProductList);
        for (let i = 0; i < this.parents.length; i++) {
          this.childNodesForParents[i] = this.getChildNode(this.parents[i]);
        }
        if (data) {
          // this.proposalProductList =  JSON.parse(localStorage.getItem('originProposalProductList'));
          this.expandAll(data);
        } else {
            // if (!localStorage.getItem('originProposalProductList')) {
            //   localStorage.setItem('originProposalProductList', JSON.stringify(this.originProposalProductList));
            // }
            // this.proposalProductList = JSON.parse(localStorage.getItem('originProposalProductList'));
          }
      });

    // Insert data from product details to table
    this.proposalService.insertedProducts.subscribe(
      data => {
        const insertedArr = [];
        this.addedIndex = this.proposalProductList.length;
        const midValue = data.map(p => p[0]);
        for (let i = 0; i <= midValue.length - 1; i += 1) {
          if (!this.proposalProductList.includes(midValue[i])) {
            this.addedIndex += 1;
            midValue[i].id = this.addedIndex;
            insertedArr.push(midValue[i]);
            if (midValue[i].addedAccList.length > 0) {
              for (let j = 0; j <= midValue[i].addedAccList.length - 1; j++) {
                this.addedIndex += 1;
                midValue[i].addedAccList[j].id = this.addedIndex;
                // set option value for each added acc product
                if (midValue[i].addedAccList[j].optionType === 'Optional') {
                  midValue[i].addedAccList[j].option = 'optionalAcc';
                } else if (midValue[i].addedAccList[j].optionType === 'Automatic') {
                  midValue[i].addedAccList[j].option = 'automaticAcc';
                }
                // set parent ID for each added acc product
                midValue[i].addedAccList[j].parentId = midValue[i].id;
                // Add missing field
                // midValue[i].addedAccList[j].sku = midValue[i].addedAccList[j].skuNumber;
                // midValue[i].addedAccList[j].model = midValue[i].addedAccList[j].modelNumber;
                // midValue[i].addedAccList[j].productType = midValue[i].productType;
                // midValue[i].addedAccList[j].unitPrice = midValue[i].addedAccList[j].friendPrice;
                // midValue[i].addedAccList[j].discount = 0;
                // midValue[i].addedAccList[j].total = midValue[i].addedAccList[j].unitPrice * midValue[i].addedAccList[j].qty *
                //                                       (100 - midValue[i].addedAccList[j].discount) / 100;
                // midValue[i].addedAccList[j].taxRate = midValue[i].taxRate;
                // add added acc products to inserted array
                insertedArr.push(midValue[i].addedAccList[j]);
              }
            }
            if (midValue[i].addedAlterList.length > 0) {
              for (let j = 0; j <= midValue[i].addedAlterList.length - 1; j++) {
                this.addedIndex += 1;
                // midValue[i].addedAlterList[j].id = this.addedIndex;
                // midValue[i].addedAlterList[j].option = 'alter';
                // midValue[i].addedAlterList[j].parentId = midValue[i].id;
                // midValue[i].addedAlterList[j].sku = midValue[i].addedAlterList[j].skuNumber;
                // midValue[i].addedAlterList[j].model = midValue[i].addedAlterList[j].modelNumber;
                // midValue[i].addedAlterList[j].productType = midValue[i].productType;
                // midValue[i].addedAlterList[j].unitPrice = midValue[i].addedAlterList[j].friendPrice;
                // midValue[i].addedAlterList[j].discount = 0;
                // midValue[i].addedAlterList[j].total = midValue[i].addedAlterList[j].unitPrice * midValue[i].addedAlterList[j].qty *
                //                                       (100 - midValue[i].addedAlterList[j].discount) / 100;
                // midValue[i].addedAlterList[j].taxRate = midValue[i].taxRate;
                // insertedArr.push(midValue[i].addedAlterList[j]);
              }
            }
          }
        }
        this.proposalProductList = this.proposalProductList.concat(insertedArr);
        this.proposalService.postUpdatedProposalProductList(this.proposalProductList);
      });

    // calculate the sum of all products price
    const cmp = this;
    cmp.proposalInfo.proposalAmount = 0;
    this.proposalProductList.forEach(product => {
      cmp.productTotal += product.unitPrice * product.qty * (100 - product.discount) / 100;
    });
    cmp.proposalInfo.proposalAmount = cmp.productTotal;

    this.proposalService.getProposalDiscount.subscribe(
      data => {
        if (data.type) {
          if (data.type[0] === '%') {
            cmp.proposalInfo.proposalAmount = (100 - data.amount) * cmp.proposalInfo.proposalAmount / 100;
          } else {
            cmp.proposalInfo.proposalAmount = cmp.proposalInfo.proposalAmount - data.amount;
          }
        }
      }
    );

    // Update table data after mass edited
    this.proposalService.massEditedData.subscribe( data => {
      console.log('data', data);
      if (data.length) {
        console.log('data1', data);
        this.proposalProductList = data;
      }
    });
    // Change unit price type to number
    this.proposalProductList.map(p => p.unitPrice = +p.unitPrice);

    // get parent totoal for each parent node
    this.parents.map(p => p.proposalTotal = p.unitPrice * p.qty * (100 - p.discount) / 100 + this.getChildPriceTotal(p));
    console.log('222222', this.parents);
  }

  @HostListener('window:keydown', ['$event'])
  keyDownEvent(event: KeyboardEvent) {
    // console.log(event.keyCode);
    // event.preventDefault();
    // event.stopPropagation();
    if (event.keyCode === 16) {
      this.isShift = true;
    }
    if (event.keyCode === 91) {
      this.isCtrl = true;
    }

    // detect Delete or backspace key down
    if (event.keyCode === 46 || event.keyCode === 8 ) {
      this.openDeleteModal();
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyUpEvent(event: KeyboardEvent) {
    this.isShift = false;
    this.isCtrl = false;
  }

  onParentRowSelect(product) {
    if (this.isCtrl) {
      const index = this.selectedRows.indexOf(product.id);
      if (index !== -1) {
        this.selectedRows.splice(index, 1);
      } else {
        this.selectedRows.push(product.id);
      }
    } else if  ( this.isShift && this.selectedRows.length > 0) {
      const from = this.proposalProductList.filter( p => p.id === this.selectedRows[0])[0].index;
      const to = product.index;
      this.selectedRows = this.proposalProductList.slice(Math.min(from, to), Math.max(from, to) + 1).map(p => p.id);
    } else {
      this.selectedRows = [product.id];
    }
    window.localStorage.setItem('selectedRows', JSON.stringify(this.selectedRows) );
  }

  onChildRowSelect(product, event) {
    event.stopPropagation();
    if (this.isCtrl) {
      const index = this.selectedRows.indexOf(product.id);
      if (index !== -1) {
        this.selectedRows.splice(index, 1);
      } else {
        this.selectedRows.push(product.id);
      }
    } else if (this.isShift && this.selectedRows.length > 0) {
      const from = this.proposalProductList.filter( p => p.id === this.selectedRows[0])[0].index;
      const to = product.index;
      this.selectedRows = this.proposalProductList.slice(Math.min(from, to), Math.max(from, to) + 1).map(p => p.id);
    } else {
      this.selectedRows = [product.id];
    }
    window.localStorage.setItem('selectedRows', JSON.stringify(this.selectedRows) );
  }
  // Avoid opening delete product modal while deleting input value
  onBlur() {
    this.isFocus = false;
  }

  // Avoid opening delete product modal while deleting input value
  onFocus() {
    this.isFocus = true;
  }

  deleteProduct() {
    for (let i = 0; i < this.selectedRows.length; i++) {
      this.proposalProductList = this.proposalProductList.filter(p => p.id !== this.selectedRows[i]);
      this.parents = this.getParentNode(this.proposalProductList);
      // if () {
      //   this.getParentTotalPrice();
      // }
    }
    this.deleteModalCollapsed = true;
  }

  cancelDelete() {
    this.deleteModalCollapsed = true;
  }

  openDeleteModal() {
    if ((this.selectedRows.length > 0) && (this.isFocus === false) ) {
      this.deleteModalCollapsed = false;
    }
  }
  // calculate certain parnent price total when editing child/parent product price/qty/discount
  getParentTotalPrice(parent) {
    parent.proposalTotal = parent.unitPrice * parent.qty * (100 - parent.discount) / 100 + this.getChildPriceTotal(parent);
    // send updated date
    const updated = new Date();
    this.updatedDate.emit({updated: moment(updated).format('MMMM DD, YYYY')});

    // calculate the sum of all products price
    const cmp = this;
    cmp.productTotal = 0;
    this.proposalProductList.forEach(product => {
      cmp.productTotal += product.unitPrice * product.qty * (100 - product.discount) / 100;
    });
    cmp.proposalInfo.proposalAmount = cmp.productTotal;
  }

  // get child price total for each parent
  getChildPriceTotal(parent) {
    // console.log('parent product:', parent, this.proposalProductList);
    let childstotal = 0;
    const childsList = this.proposalProductList.filter(p => p.parentId === parent.id);
    console.log('childs list', parent, childsList);
    for (let i = 0; i < childsList.length; i++) {
      if (childsList[i].option === 'automaticAcc') {
        childstotal = childstotal + (childsList[i].qty * childsList[i].unitPrice * (100 - childsList[i].discount) / 100);
      }
    }
    return childstotal;
  }

  checkExpand(parentProduct) {
    parentProduct.expanded = !parentProduct.expanded;
    // if (!parentProduct.expanded) {
    //   const childProductSkus = parentProduct.children.map(c => c.sku);
    //   this.selectedRows = this.selectedRows.filter(sku => !childProductSkus.includes(sku));
    // }
  }

  onClickedOutside(event) {
    this.selectedRows = [];
  }

  expandAll(expanded) {
    const parents = this.parents;
    for (let i = 0; i < parents.length; i++) {
      const parentProduct  = parents[i];
      parentProduct.expanded = true;
      if (parentProduct.category !== 'Multi Category') {
        const skusList = {};
        const childProducts = [];
        this.childNodesForParents[i].map(product => {
          product.expanded = true;
          childProducts.push(product);
        });
        this.childNodesForParents[i] = childProducts;
      } else {
        const skusList = {};
        this.childNodesForParents[i].map(product => {
          if (product.sku !== parentProduct.sku) {
            if (skusList[product.sku] === undefined) {
              skusList[product.sku] = product;
            } else {
              skusList[product.sku].qty++;
            }
          }
        });
        const childProducts = [];
        Object.keys(skusList).map(function(key, index) {
          skusList[key].expanded = true;
          childProducts.push(skusList[key]);
        });
        this.childNodesForParents[i] = childProducts;
      }
    }
  }

  getParentNode(productsList) {
    // this.parentNodes = productsList.filter(product => !product.parentId);
    // return this.parentNodes;
    return this.showParentOnly();
  }

  getChildNode(parentProduct) {
    // console.log('parent product:', parentProduct, [...this.proposalProductList]);
    const skusList = {};
    let childs = [];
    if (parentProduct.category === 'Multi Category') {
      const levelOneChilds = this.proposalProductList.filter(p => (p.sku === parentProduct.sku) && (p.parentId === undefined));
      for ( let i = 0; i < this.proposalProductList.length; i ++ ) {
        if (parentProduct.sku === this.proposalProductList[i].sku) {
          const levelTwoChilds = this.proposalProductList.filter(p => {
            return p.parentId === this.proposalProductList[i].id;
          });

          if (levelTwoChilds.length > 0) {
            childs.push(this.proposalProductList[i]);
            childs = childs.concat(levelTwoChilds);
          }
        }
      }
      return childs;
    } else {
      const firstChild = this.proposalProductList.filter(product => product.sku === parentProduct.sku);
      const childNodes = this.proposalProductList.filter(product => product.parentId === firstChild[0].id);
      return childNodes;
    }
  }

  getIconImgResource(child) {
    if (child.option === 'automaticAcc') {
      return 'assets/images/right-arrow (1).svg';
    } else if (child.option === 'optionalAcc') {
      return 'assets/images/right-arrow copy.svg';
    } else if (child.option === 'alter') {
      return 'assets/images/shuffle.svg';
    }
    return '';
  }

  changeProductOption(childProduct, parentProduct) {
    if (childProduct.option === 'optionalAcc') {
      this.proposalProductList[childProduct.id - 1].option = 'automaticAcc';
      this.proposalProductList[childProduct.id - 1].imgClicked = true;
      this.getParentTotalPrice(parentProduct);
    } else if (childProduct.imgClicked) {
      this.proposalProductList[childProduct.id - 1].option = 'optionalAcc';
      this.getParentTotalPrice(parentProduct);
    }
  }

  getParentSkuList() {
    let skuList = this.proposalProductList.filter( p => p.option === undefined ).map( p => p.sku);
    // remove duplicates
    skuList = skuList.filter(function(item, pos) {
      return skuList.indexOf(item) === pos;
    });
    return skuList;
  }

  createNewParent(arr) {
    // tslint:disable-next-line:prefer-const
    let newParent = {};
    Object.assign(newParent, arr[0]);
    if (this.max === undefined) {
      let max = 0;
      _.forEach(this.proposalProductList, element => {
        if (max < element.id) {
          max = element.id;
        }
      });
      this.max = max;
    }
    this.max ++;
    if (arr.length > 1) {
      newParent['id'] = this.max;
    }

    newParent['qty'] = arr.length;
    // calculate sum of child products total price
    newParent['total'] = arr.map( a => a.total).reduce((a, b) => a + b, 0);
    if (arr.length > 1) {
      newParent['category'] = 'Multi Category';
    }
    return newParent;
  }

  listInDetail(product) {
    const skuList = this.getParentSkuList();
  }

  showParentOnly() {
    const parents = [];
    const parentsOnly = this.proposalProductList.filter (p => p.option === undefined);
    this.getParentSkuList().forEach(element => {
      const a = parentsOnly.filter( p => p.sku === element);
        parents.push(this.createNewParent(a));

    });
    return parents;
  }

  removeParents() {
    // Remove parents from list
    const parents = [];
    const parentsOnly = this.proposalProductList.filter (p => p.option === undefined);
    this.getParentSkuList().forEach(element => {
      const a = parentsOnly.filter( p => p.sku === element);
        parents.push(this.createNewParent(a));

    });
    return parentsOnly;
  }

  updateParentSkuList() {
    // SkuList duplicates
    let skuList = this.proposalProductList.filter( p => p.option === undefined ).map( p => p.sku);
    // remove duplicates
    skuList = skuList.filter(function(item, pos) {
      return skuList.indexOf(item) === pos;
    });
    return skuList;
  }

  removeParent(arr) {
    // tslint:disable-next-line:prefer-const
    let removableParent = {};
    Object.assign(removableParent, arr[0]);
    if (this.max === undefined) {
      let max = 0;
      _.forEach(this.proposalProductList, element => {
        if (max < element.id) {
          max = element.id;
        }
      });
      this.max = max;
    }
    this.max ++;
    if (arr.length > 1) {
      removableParent['id'] = this.max;
    }

    removableParent['qty'] = arr.length;
    // calculate sum of child products total price
    removableParent['total'] = arr.filter( a => a.total).reduce((a, b) => a + b, 0);

    return removableParent;
  }

  updateProductsList (productId) {
    this.proposalProductList = [];
    this.productsService.updateProductIndividualCategory(productId).subscribe(res => {
      console.log('update product', this.proposalProductList);
      // update products 
    });
   
  }
}
