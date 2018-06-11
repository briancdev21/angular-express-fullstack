import { Component, OnInit, Input } from '@angular/core';
import { ProductDetailInfo } from '../../../../models/ProductDetailInfo.model';
import { Router } from '@angular/router';
import { PurchaseOrderModel } from '../../../../models/purchaseorder.model';
import { SharedService } from '../../../../services/shared.service';
import { ContactUserModel } from '../../../../models/contactuser.model';

@Component({
  selector: 'app-inventorybody',
  templateUrl: './inventorybody.component.html',
  styleUrls: ['./inventorybody.component.css'],
  providers: [SharedService]
})

export class InventoryBodyComponent {
  @Input() set poData(_podata) {
    this.po_mock = _podata;
    this.po_id = `PO-${this.po_mock.id}`;
    this.contactId = this.po_mock.contactId;
    // Get customerAddress:
    if (this.po_mock.contactId !== undefined && this.contactList !== undefined) {
      const contactIdNumber = parseInt(this.po_mock.contactId.toString().split('-').pop(), 10);
      this.po_mock.contactId = contactIdNumber;
      const selectedContact = this.contactList.filter(contact => contact.id === this.po_mock.contactId);
      this.customerAddress = selectedContact[0]['shippingAddress'];
    }
    this.discountAmount = this.po_mock.discount.value;
    this.discountType = this.po_mock.discount.unit;
    this.freightcosts = this.po_mock.freightCost;
    this.po_mock.status = 'SENT';
    this.dueDate = this.po_mock.dueDate;
    this.createdDate = this.po_mock.createdAt;
    this.shippingAddress = this.po_mock.shippingAddress;
    this.selectedTerm = this.po_mock.termId;
    if (this.po_mock['storingAddressId'] !== undefined ) {
      this.selectedLocation = parseInt(this.po_mock['storingAddressId'].split('-').pop(), 10);
      this.po_mock.location = this.selectedLocation;
    }
    this.internalMemo = this.po_mock.internalMemo;
    this.supplierNote = this.po_mock.supplierNote;

    if (this.po_mock.id !== undefined) {
      this.sharedService.getPurchaseOrderProducts(this.po_mock.id).subscribe( productRes => {
        this.productDetails = productRes.results;
        this.productDetails.forEach(productDetail => {
          productDetail.discount = productDetail.discount.value;
        });
      });
    }
  }

  po_mock: PurchaseOrderModel;
  contactList: ContactUserModel[];
  contactId = undefined;
  userList = [];

  projects = ['task1', 'task2', 'task3'];
  labelText = 'Use customer address';
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
    customerChanged: false,
    memoChanged: false,
    noteToSupplierChanged: false
  };
  showErrors = false;

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
  taxrate = 0;
  origin_taxes = undefined;

  po_id = '';
  createdDate: any;
  supplierNote: any;

  // footer
  currency = 'CAD';
  language = 'ENG';
  showButtons = false;
  showSendPOModal = false;
  showCancelPOModal = false;
  showPrintOptions = false;
  printOptions = {
   brand: false,
   qty: false,
   supplier: false,
   totalprice: false
  };

  constructor(private router: Router, private sharedService: SharedService) {
    this.sharedService.getContacts().subscribe(res => {
      this.contactList = res;
      this.userList = this.contactList.map((contactUser, index) => {
        return {
          'name': contactUser.person.firstName + ' ' + contactUser.person.lastName,
          'value': index
        };
      });
    });
    this.sharedService.getLocations().subscribe(locationRes => {
      this.locations = locationRes.results;
    });
    this.sharedService.getTerms().subscribe(termRes => {
      this.terms = termRes.results;
    });
  }

  onCustomerSelected(user) {
  }
  onSelectUser(selectedIndex: string) {
    this.customerAddress = this.contactList[selectedIndex].shippingAddress;
    this.contactId = selectedIndex;
    this.po_mock.contactId = parseInt(this.contactList[selectedIndex].id, 10);
  }

  onSwitchChanged(status: boolean) {
    console.log('switch status:', status);
  }

  onSelectLocation(selectedLocationId: string) {
    this.errors.locationChanged = true;
    this.po_mock.location = parseInt(selectedLocationId, 10);
    const selectedLocation = this.locations.filter(location => location.id.toString() === selectedLocationId);
    this.shippingAddress = selectedLocation[0].address;
  }
  onSelectTerm(selectedTermId: string) {
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

  onCancel() {
    this.showCancelPOModal = true;
  }

  deletePO() {
    // this.sharedService.deletePurchaseOrder(this.po_mock.id).subscribe(() => {
      this.router.navigate(['./inventory/stock-control']);
    // });
  }

  onSave() {
    this.router.navigate(['./inventory/stock-control']);
  }

  savePO() {
  }

  onDueDateChanged(event) {
    this.po_mock.dueDate = event;
    this.updatePO();
  }
  onNoteChanged(event) {
    if (event) {
      this.errors.noteToSupplierChanged = true;

      this.po_mock.supplierNote = event;
      this.updatePO();
    } else {
      this.errors.noteToSupplierChanged = false;
    }
  }

  onMemoChanged(event) {
    if (event) {
      this.errors.memoChanged = true;

      this.po_mock.internalMemo = event;
      this.updatePO();

    } else {
      this.errors.memoChanged = false;
    }

  }
  onShippingAddressChanged(event) {
    this.po_mock.shippingAddress = event;
    this.updatePO();
  }

  updatePO () {
    if (this.po_mock.location !== undefined
      && this.po_mock.term !== undefined
      && this.po_mock.freightCost !== undefined
      && this.po_mock.discount !== undefined
      && this.po_mock.internalMemo !== undefined
      && this.po_mock.supplierNote !== undefined
    ) {
      this.sharedService.updatePurchaseOrder(this.po_mock.id, this.po_mock).subscribe((resp) => {
        this.po_mock.subTotal = resp.data.subTotal;
        this.po_mock.totalTax = resp.data.totalTax;
        this.po_mock.total = resp.data.total;
        this.po_mock.dueDate = resp.data.dueDate;
        this.dueDate = resp.data.dueDate;
      });
    }
  }
}
