import { Injectable, Output, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class ProposalService {
// send id to add product modal after new product is created
  newProductId: BehaviorSubject<any> = new BehaviorSubject({});
  constructor() {

  }
   insertProducts = new BehaviorSubject<any>([]);
   expanded = new BehaviorSubject<boolean>(false);
   modalClose = new BehaviorSubject<any>(true);
   updatedProposalProductList = new BehaviorSubject<any>([]);
   updatedProposalDiscount = new BehaviorSubject<any>({});
   massEdit = new BehaviorSubject<any>([]);

  // Observable string streams
  tableExpanded = this.expanded.asObservable();
  insertedProducts = this.insertProducts.asObservable();
  onModalStatus = this.modalClose.asObservable();
  getUpdatedProposalProductList = this.updatedProposalProductList.asObservable();
  getProposalDiscount = this.updatedProposalDiscount.asObservable();
  massEditedData = this.massEdit.asObservable();

    // Service message commands
  expandAll(data: boolean) {
    this.expanded.next(data);
  }

  insertToTable(data: any) {
    this.insertProducts.next(data);
  }

  closeModal(data) {
    this.modalClose.next(data);
  }

  // In order to update productProposalList when new product is inserted from product details list.
  postUpdatedProposalProductList(data) {
    this.updatedProposalProductList.next(data);
  }

  // calculate total proposal * discount
  postProposalDiscount(data) {
    this.updatedProposalDiscount.next(data);
  }

  massEditedList(data) {
    this.massEdit.next(data);
  }

  
}
