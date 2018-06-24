import { Component, OnInit, Input } from '@angular/core';
import { ProductDetailInfo } from '../../../../models/ProductDetailInfo.model';
import _ from 'lodash';
import { SharedService } from '../../../../services/shared.service';
import { ContactUserModel } from '../../../../models/contactuser.model';
import { PurchaseOrderModel } from '../../../../models/purchaseorder.model';
import { PurchaseOrderCreateModel } from '../../../../models/purchaseordercreate.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventorybody',
  templateUrl: './inventorybody.component.html',
  styleUrls: ['./inventorybody.component.css'],
  providers: [SharedService]
})
export class InventoryBodyComponent {
  @Input() set poData(_podata) {
    this.po_mock = _podata;
    console.log('po mock', this.po_mock);
    if (_podata) {
      this.po_id = `PO-${this.po_mock.id}`;
      this.discountAmount = this.po_mock.discount.value;
      this.discountType = this.po_mock.discount.unit;
      this.freightcosts = this.po_mock.freightCost;
      this.po_mock.status = 'OPEN';
    }
  }

  // Footer
  showButtons = false;
  showPrintOptions = false;
  showSendPOModal = false;
  showCancelPOModal = false;
  printOptions = {
   brand: false,
   qty: false,
   supplier: false,
   totalprice: false
  };

  // Main Section
  contactList: ContactUserModel[];
  contactId = undefined;
  userList = [];

  projects = ['task1', 'task2', 'task3'];
  labelText = 'Use customer address';

  terms = [];
  selectedTerm = undefined;
  dueDate: any;

  locations = [];
  selectedLocation = undefined;

  productDetails = [];

  internalMemo = undefined;
  subtotalproducts = undefined;
  discountType = 'AMOUNT';
  discountAmount = undefined;
  freightcosts = undefined;
  taxes = undefined;
  totalamountdue = undefined;
  po_id = '';
  createdDate: any;
  origin_taxes = 0;
  taxrate = 0;
  noteToSupplier: any;

  po_mock: PurchaseOrderModel;
  shippingAddress = {
    address: undefined,
    province: undefined,
    city: undefined,
    country: undefined,
    postalCode: undefined
  };
  customerAddress: any = {};
  errors = {
    termChanged: false,
    locationChanged: false,
    customerChanged: false
  };
  showErrors = false;

  constructor(private sharedService: SharedService, private router: Router) {
    this.createdDate = new Date().toISOString();
    this.dueDate = new Date().toISOString();
      // Get contacts
      this.sharedService.getContacts().subscribe(res => {
        res = this.addContactName(res);
        this.contactList = res;
        this.userList = this.contactList.map((contactUser) => contactUser.person.firstName + ' ' + contactUser.person.lastName);
      });
      this.sharedService.getLocations().subscribe(locationRes => {
        this.locations = locationRes.results;
      });
      this.sharedService.getTerms().subscribe(termRes => {
        this.terms = termRes.results;
      });
  }

  onSwitchChanged(status: boolean) {
    console.log('switch status:', status);
  }

  onCustomerSelected(user) {
    console.log(user);
  }

  onSelectUser(selectedIndex: string) {
    this.customerAddress = this.contactList[selectedIndex].shippingAddress;
    this.contactId = this.contactList[selectedIndex].id;
    this.po_mock.contactId = parseInt(this.contactList[selectedIndex].id, 10);
  }

  onSelectLocation(selectedLocationId: string) {
    console.log('selected location:', selectedLocationId);
    this.errors.locationChanged = true;
    this.po_mock.location = parseInt(selectedLocationId, 10);
    const selectedLocation = this.locations.filter(location => location.id.toString() === selectedLocationId);
    console.log('address:', selectedLocation[0].address);
    this.shippingAddress = selectedLocation[0].address;
  }

  onSelectTerm(selectedTermId: string) {
    console.log('selected term:', selectedTermId);
    this.errors.termChanged = true;
    this.po_mock.term = parseInt(selectedTermId, 10);
    this.updatePO();
  }

  onPriceChanged() {
    this.updatePO();
  }

  onTotalPriceChange(data) {
    if (data.amount !== undefined) {
      this.discountAmount = data.amount;
      this.po_mock.discount.value = data.amount;
    }
    if (data.discountType !== this.discountType && data.type) {
      this.discountType = data.type;
      this.po_mock.discount.unit = data.type;
    }
    if (data.freightcosts !== undefined) {
      this.freightcosts = data.freightcosts;
      this.po_mock.freightCost = data.freightcosts;
    }
    this.updatePO();
  }



  deletePO() {
    this.sharedService.deletePurchaseOrder(this.po_mock.id).subscribe(() => {
      this.router.navigate(['./inventory/stock-control']);
    });
  }


  savePO() {
    this.po_mock.status = 'SENT';
    this.sharedService.updatePurchaseOrder(this.po_mock.id, this.po_mock).subscribe((data) => {
      this.router.navigate(['./inventory/stock-control']);
    });
  }

  onDueDateChanged(event) {
    this.po_mock.dueDate = event;
    this.updatePO();
  }
  onNoteChanged(event) {
      this.po_mock.supplierNote = event;
      this.updatePO();
  }

  onMemoChanged(event) {
      this.po_mock.internalMemo = event;
      this.updatePO();
  }

  onShippingAddressChanged(event) {
    this.po_mock.shippingAddress = event;
    this.updatePO();
  }

  onCancel() {
    this.sharedService.deletePurchaseOrder(this.po_mock.id).subscribe(() => {
      this.router.navigate(['./inventory/stock-control']);
    });
  }

  onSupplierSentSwitchChanged(val) {

  }

  onSave() {
    // tslint:disable-next-line:curly
    this.showErrors = true;
    if (this.errors.termChanged && this.errors.locationChanged) {
      this.showSendPOModal = true;
    }
  }

  updatePO() {
    if (this.po_mock.id !== undefined && this.errors.termChanged && this.errors.locationChanged) {
      this.sharedService.updatePurchaseOrder(this.po_mock.id, this.po_mock).subscribe((data) => {
        this.po_mock.subTotal = data.data.subTotal;
        this.po_mock.totalTax = data.data.totalTax;
        this.po_mock.total = data.data.total;
        this.po_mock.dueDate = data.data.dueDate;
        this.dueDate = data.data.dueDate;
      });
    }
  }
  addContactName(data) {
    data.forEach(element => {
      if (element.type === 'PERSON') {
        element.name = element.person.firstName + ' ' + element.person.lastName;
      } else {
        element.name = element.business.name;
      }
    });
    return data;
  }
}
