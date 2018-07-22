import { Component, Input, OnInit, HostListener, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { ProposalService } from '../proposal.service';
import * as moment from 'moment';
import { forEach } from '@angular/router/src/utils/collection';
import { PmTasksService } from '../../../../services/pmtasks.service';
import { ProductsService } from '../../../../services/inventory/products.service';
import { ProposalsService } from '../../../../services/proposals.service';
import { SharedService } from '../../../../services/shared.service';
import { CommonService } from '../../../common/common.service';

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
  @Output() updatedData: EventEmitter<any> = new EventEmitter;

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
  proposalId: any;
  brandsList: any;
  productTypesList: any;
  taxRatesList: any;
  proposalProductOrdered = [];
  modalContent = 'You cannot change WON project';
  categoryListAll = [];
  subCategoryListAll = [];

  constructor( private proposalService: ProposalService, private productsService: ProductsService,
  private proposalsService: ProposalsService, private route: ActivatedRoute, private sharedService: SharedService,
    private commonService: CommonService) {
    const productId = localStorage.getItem('productId');
    this.proposalId = this.route.snapshot.paramMap.get('id');
    // if (productId) {
    //   this.productsService.getProductAccessoriesList(productId).subscribe(res => {
    //     // product list
    //   });
    //   this.productsService.getProductAlternativesList(productId).subscribe(res => {
    //     // product list
    //     const alternativesList = res.results;
    //     const listIds = alternativesList.filter(item => item.id);
    //   });
    // }


    this.productsService.getProductsList().subscribe(res => {
    });

    this.sharedService.getTaxRates().subscribe(tax => {
      this.taxRatesList = tax.results;

      this.sharedService.getBrands().subscribe(brand => {
        this.brandsList = brand.results;

        this.sharedService.getProductTypes().subscribe(pType => {
          this.productTypesList = pType.results;

          this.sharedService.getCategories().subscribe(res => {
            this.categoryListAll = res.results;

            this.sharedService.getSubCategories().subscribe(data => {
              const subCategory = data.results;
              this.subCategoryListAll = data.results;

              this.getProposalProductData();

              this.proposalsService.getIndividualProposal(this.proposalId).subscribe(proposal => {
                this.proposalInfo = proposal.data;
                this.proposalInfo.categoryIds.forEach(element => {
                  this.proposalCategoryList.push(this.categoryListAll.filter(c => c.id === element)[0]);
                });
                this.proposalInfo.subcategoryIds.forEach(element => {
                  this.proposalSubCategoryList.push(this.subCategoryListAll.filter(c => c.id === element)[0]);
                });
              });
            });
          });
        });
      });
    });
  }

  getProposalProductData() {
    let index = 0;
    this.parents = [];
    this.proposalProductOrdered = [];
    this.proposalsService.getProposalProducts(this.proposalId).subscribe(response => {
      this.originProposalProductList = response.results;

      this.originProposalProductList.forEach(ele => {
        ele.brand = this.getBrandNameFromId(ele.brandId);
        ele.productType = this.getProductTypeFromId(ele.productTypeId);
        ele.taxRate = this.getTaxRateNameFromId(ele.taxRateId);
        ele.categoryId = ele.categoryId ? ele.categoryId : 0;
        ele.subcategoryId = ele.subcategoryId ? ele.subcategoryId : 0;
      });
      this.parents = this.originProposalProductList.filter(p => p.type === 'PRODUCT');
      this.parents.forEach(ele => {
        ele.expand = true;
        ele.parentTotalPrice = ele.total;
        this.proposalProductOrdered = this.proposalProductOrdered.concat(ele);
        if (ele.accessories) {
          ele.accessories.forEach(element => {
            const selectedItem = this.originProposalProductList.filter(p => p.id === element)[0];
            ele.parentTotalPrice = ele.parentTotalPrice + selectedItem.total;
            this.proposalProductOrdered  = this.proposalProductOrdered.concat(selectedItem);
          });
        }

        if (ele.alternatives) {
          ele.alternatives.forEach(element => {
            const selectedItem = this.originProposalProductList.filter(p => p.id === element)[0];
            this.proposalProductOrdered  = this.proposalProductOrdered.concat(selectedItem);
          });
        }
      });
      this.proposalProductOrdered.forEach(element => {
        element.index = index;
        index = index + 1;
      });
      console.log('ordered products: ', this.proposalProductOrdered);
    });
  }

  updateProposalProduct(product) {
    if ( this.proposalInfo.dealStatus === 'WON') {
      this.commonService.showAlertModal.next(true);
      this.getProposalProductData();
    } else {
      if (product.quantity && (product.discount.value !== null)) {
        const updatingData = {
          'categoryId': product.categoryId ? parseInt(product.categoryId, 10) : undefined,
          'subcategoryId': product.subcategoryId ? parseInt(product.subcategoryId, 10) : undefined,
          'pricingCategoryId': parseInt(product.pricingCategoryId, 10),
          'priceAdjustment': {
            'value': product.priceAdjustment.value,
            'unit': product.priceAdjustment.unit
          },
          'discount': {
            'value': product.discount.value,
            'unit': 'AMOUNT'
          },
          'quantity': product.quantity,
          'useProductInProject': product.useProductInProject
        };
        this.proposalsService.updateIndividualProposalProduct(this.proposalId, product.id, updatingData).subscribe(res => {
          if (res) {
            this.getProposalProductData();
            this.updatedData.emit(true);
          }
        });
      }
    }

  }

  ngOnDestroy() {
    localStorage.removeItem('originProposalProductList');
    this.commonService.showAlertModal.next(false);
  }

  ngOnInit() {
    this.proposalProductList = this.originProposalProductList;
    this.proposalService.tableExpanded.subscribe(
      data => {
        this.expandAll(data);
        this.proposalProductList.map(product => product.expanded = false);
        this.parents = this.getParentNode(this.proposalProductList);
        for (let i = 0; i < this.parents.length; i++) {
          this.childNodesForParents[i] = this.getChildNode(this.parents[i]);
        }
        if (data) {
          // this.proposalProductList =  JSON.parse(localStorage.getItem('originProposalProductList'));
        } else {
            // if (!localStorage.getItem('originProposalProductList')) {
            //   localStorage.setItem('originProposalProductList', JSON.stringify(this.originProposalProductList));
            // }
            // this.proposalProductList = JSON.parse(localStorage.getItem('originProposalProductList'));
          }
      });
    // commented for now
    // Insert data from product details to table
    if ( this.proposalInfo.dealStatus === 'WON') {
      this.commonService.showAlertModal.next(true);
      this.getProposalProductData();
    } else {
      this.proposalService.insertedProducts.subscribe(
        data => {
          if (data.length > 0) {
            this.getProposalProductData();
          }
    //     console.log('inserted Data: ', data);
    //     const insertedArr = [];
    //     this.addedIndex = this.proposalProductList.length;
    //     const midValue = data.map(p => p[0]);
    //     for (let i = 0; i <= midValue.length - 1; i += 1) {
    //       if (!this.proposalProductList.includes(midValue[i])) {
    //         this.addedIndex += 1;
    //         midValue[i].id = this.addedIndex;
    //         insertedArr.push(midValue[i]);
    //         if (midValue[i].addedAccList.length > 0) {
    //           for (let j = 0; j <= midValue[i].addedAccList.length - 1; j++) {
    //             this.addedIndex += 1;
    //             midValue[i].addedAccList[j].id = this.addedIndex;
    //             // set option value for each added acc product
    //             if (midValue[i].addedAccList[j].optionType === 'Optional') {
    //               midValue[i].addedAccList[j].option = 'optionalAcc';
    //             } else if (midValue[i].addedAccList[j].optionType === 'Automatic') {
    //               midValue[i].addedAccList[j].option = 'automaticAcc';
    //             }
    //             // set parent ID for each added acc product
    //             midValue[i].addedAccList[j].parentId = midValue[i].id;
    //             // Add missing field
    //             midValue[i].addedAccList[j].sku = midValue[i].addedAccList[j].skuNumber;
    //             midValue[i].addedAccList[j].model = midValue[i].addedAccList[j].modelNumber;
    //             midValue[i].addedAccList[j].productType = midValue[i].productType;
    //             midValue[i].addedAccList[j].unitPrice = midValue[i].addedAccList[j].friendPrice;
    //             midValue[i].addedAccList[j].discount = 0;
    //             midValue[i].addedAccList[j].total = midValue[i].addedAccList[j].unitPrice * midValue[i].addedAccList[j].qty *
    //                                                   (100 - midValue[i].addedAccList[j].discount) / 100;
    //             midValue[i].addedAccList[j].taxRate = midValue[i].taxRate;
    //             // add added acc products to inserted array
    //             insertedArr.push(midValue[i].addedAccList[j]);
    //           }
    //         }
    //         if (midValue[i].addedAlterList.length > 0) {
    //           for (let j = 0; j <= midValue[i].addedAlterList.length - 1; j++) {
    //             this.addedIndex += 1;
    //             midValue[i].addedAlterList[j].id = this.addedIndex;
    //             midValue[i].addedAlterList[j].option = 'alter';
    //             midValue[i].addedAlterList[j].parentId = midValue[i].id;
    //             midValue[i].addedAlterList[j].sku = midValue[i].addedAlterList[j].skuNumber;
    //             midValue[i].addedAlterList[j].model = midValue[i].addedAlterList[j].modelNumber;
    //             midValue[i].addedAlterList[j].productType = midValue[i].productType;
    //             midValue[i].addedAlterList[j].unitPrice = midValue[i].addedAlterList[j].friendPrice;
    //             midValue[i].addedAlterList[j].discount = 0;
    //             midValue[i].addedAlterList[j].total = midValue[i].addedAlterList[j].unitPrice * midValue[i].addedAlterList[j].qty *
    //                                                   (100 - midValue[i].addedAlterList[j].discount) / 100;
    //             midValue[i].addedAlterList[j].taxRate = midValue[i].taxRate;
    //             insertedArr.push(midValue[i].addedAlterList[j]);
    //           }
    //         }
    //       }
    //     }
    //     this.proposalProductList = this.proposalProductList.concat(insertedArr);
    //     this.proposalService.postUpdatedProposalProductList(this.proposalProductList);
      });
    }
    // comment end here

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
      if (data.length) {
        this.proposalProductList = data;
      }
    });
    // Change unit price type to number
    this.proposalProductList.map(p => p.unitPrice = +p.unitPrice);

    // get parent totoal for each parent node
    this.parents.map(p => p.proposalTotal = p.unitPrice * p.qty * (100 - p.discount) / 100 + this.getChildPriceTotal(p));
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
      if ( this.proposalInfo.dealStatus === 'WON') {
        this.commonService.showAlertModal.next(true);
        this.getProposalProductData();
      } else {
        this.openDeleteModal();
      }
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
      const from = this.proposalProductOrdered.filter( p => p.id === this.selectedRows[0])[0].index;
      const to = product.index;
      this.selectedRows = this.proposalProductOrdered.slice(Math.min(from, to), Math.max(from, to) + 1).map(p => p.id);
    } else {
      this.selectedRows = [product.id];
    }
    window.localStorage.setItem('selectedRows', JSON.stringify(this.selectedRows) );
  }

  // onChildRowSelect(product, event) {
  //   event.stopPropagation();
  //   if (this.isCtrl) {
  //     const index = this.selectedRows.indexOf(product.id);
  //     if (index !== -1) {
  //       this.selectedRows.splice(index, 1);
  //     } else {
  //       this.selectedRows.push(product.id);
  //     }
  //   } else if (this.isShift && this.selectedRows.length > 0) {
  //     const from = this.proposalProductList.filter( p => p.id === this.selectedRows[0])[0].index;
  //     const to = product.index;
  //     this.selectedRows = this.proposalProductList.slice(Math.min(from, to), Math.max(from, to) + 1).map(p => p.id);
  //   } else {
  //     this.selectedRows = [product.id];
  //   }
  //   window.localStorage.setItem('selectedRows', JSON.stringify(this.selectedRows) );
  // }
  // Avoid opening delete product modal while deleting input value
  onBlur(product) {
    this.isFocus = false;
    if (product) {
      this.updateProposalProduct(product);
    }
  }

  // Avoid opening delete product modal while deleting input value
  onFocus() {
    this.isFocus = true;
  }

  deleteProduct() {
    for (let i = 0; i < this.selectedRows.length; i++) {
      // this.proposalProductList = this.proposalProductList.filter(p => p.id !== this.selectedRows[i]);
      // this.parents = this.getParentNode(this.proposalProductList);
      // if () {
      //   this.getParentTotalPrice();
      // }
      this.proposalsService.deleteIndividualProposalProduct(this.proposalId, this.selectedRows[i]).subscribe(res => {
        this.getProposalProductData();
      });
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
    // parent.proposalTotal = parent.unitPrice * parent.qty * (100 - parent.discount) / 100 + this.getChildPriceTotal(parent);
    // // send updated date
    // const updated = new Date();
    // this.updatedDate.emit({updated: moment(updated).format('MMMM DD, YYYY')});

    // // calculate the sum of all products price
    // const cmp = this;
    // cmp.productTotal = 0;
    // this.proposalProductList.forEach(product => {
    //   cmp.productTotal += product.unitPrice * product.qty * (100 - product.discount) / 100;
    // });
    // cmp.proposalInfo.proposalAmount = cmp.productTotal;
  }

  // get child price total for each parent
  getChildPriceTotal(parent) {
    // console.log('parent product:', parent, this.proposalProductList);
    let childstotal = 0;
    const childsList = this.proposalProductList.filter(p => p.parentId === parent.id);
    for (let i = 0; i < childsList.length; i++) {
      if (childsList[i].option === 'automaticAcc') {
        childstotal = childstotal + (childsList[i].qty * childsList[i].unitPrice * (100 - childsList[i].discount) / 100);
      }
    }
    return childstotal;
  }

  checkExpand(parentProduct) {
    parentProduct.expanded = !parentProduct.expanded;
    let childs = [];
    if (parentProduct.alternatives) {
      childs = parentProduct.alternatives.concat(parentProduct.accessories);
    } else {
      childs = parentProduct.accessories;
    }

    if (childs) {
      childs.forEach(element => {
        this.proposalProductOrdered.forEach(ele => {
          if (element === ele.id) {
            ele.expand = !ele.expand;
          }
        });
      });
    }

  }

  updateOptional(product) {
    console.log('optional accessory: ', product);
    if (product.type === 'ACCESSORY' || product.type === 'ALTERNATIVE') {
      product.useProductInProject = !product.useProductInProject;
      this.updateProposalProduct(product);
    }
  }

  onClickedOutside(event) {
    this.selectedRows = [];
  }

  expandAll(expanded) {
    // Disable it for now because multi category is not supported yet on back end.
    // const parents = this.parents;
    // for (let i = 0; i < parents.length; i++) {
    //   const parentProduct  = parents[i];
    //   parentProduct.expanded = true;
    //   if (parentProduct.category !== 'Multi Category') {
    //     const skusList = {};
    //     const childProducts = [];
    //     this.childNodesForParents[i].map(product => {
    //       product.expanded = true;
    //       childProducts.push(product);
    //     });
    //     this.childNodesForParents[i] = childProducts;
    //   } else {
    //     const skusList = {};
    //     this.childNodesForParents[i].map(product => {
    //       if (product.sku !== parentProduct.sku) {
    //         if (skusList[product.sku] === undefined) {
    //           skusList[product.sku] = product;
    //         } else {
    //           skusList[product.sku].qty++;
    //         }
    //       }
    //     });
    //     const childProducts = [];
    //     Object.keys(skusList).map(function(key, index) {
    //       skusList[key].expanded = true;
    //       childProducts.push(skusList[key]);
    //     });
    //     this.childNodesForParents[i] = childProducts;
    //   }
    // }
    if (expanded) {
      this.proposalProductOrdered.forEach(ele => {
        ele.expand = true;
      });
    } else {
      this.proposalProductOrdered.forEach(ele => {
        if (ele.type !== 'PRODUCT') {
          ele.expand = false;
        }
      });
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

  getIconImgResource(product) {
    if (product.type === 'ACCESSORY' && product.useProductInProject === true) {
      return 'assets/images/right-arrow (1).svg';
    } else if (product.type === 'ACCESSORY' && product.useProductInProject === false) {
      return 'assets/images/right-arrow copy.svg';
    } else if (product.type === 'ALTERNATIVE') {
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

  updateProductsList (productId, categoryId, data) {
    this.proposalProductList = [];
    this.productsService.updateProductIndividualCategory(categoryId, productId, data).subscribe(res => {
      console.log('update product', this.proposalProductList);
      // update products
    });
  }

  getBrandNameFromId(id) {
    const selectedBrand = this.brandsList.filter(b => b.id === id)[0];
    return selectedBrand.name;
  }

  getProductTypeFromId(id) {
    const  productType = this.productTypesList.filter(p => p.id === id)[0];
    return productType.type;
  }

  getCategoryFromId(id) {
    const  category = this.proposalCategoryList.filter(c => c.id === id)[0];
    return category.name;
  }

  getSubCategoryFromId(id) {
    const subCategory = this.proposalSubCategoryList.filter(s => s.id === id)[0];
    return subCategory.name;
  }

  getTaxRateNameFromId(id) {
    const taxRate = this.taxRatesList.filter(s => s.id === id)[0];
    return taxRate.name;
  }

}
